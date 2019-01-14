import { NgReduxRouter } from '@angular-redux/router';
import { NgRedux } from '@angular-redux/store';
import { createOffline } from '@redux-offline/redux-offline';
import { applyMiddleware, compose, createStore, DeepPartial, Store, combineReducers, AnyAction } from 'redux';
import { createEpicMiddleware, EpicMiddleware, ofType, combineEpics, Epic } from 'redux-observable';
import { ReduxOfflineConfiguration } from './redux-offline.configuration';
import { ReducerRegistry } from '@skysmack/redux';
import { portalReducer } from './portal-reducer';
import { hydratedReducer } from './hydrated-reducer';
import { Reducer } from 'redux';
import { of, BehaviorSubject } from 'rxjs';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { log } from '@skysmack/framework';
import { Injector, Injectable } from '@angular/core';
import { SkysmackRequests, SkysmackActions } from '@skysmack/packages-skysmack-core';
import { newEpics$ } from '@skysmack/ng-redux';



export const epic$: BehaviorSubject<Epic<AnyAction>> = new BehaviorSubject(combineEpics((action$) => {
    return action$.pipe(
        ofType('INIT'),
        map(() => ({ type: 'INIT_SUCCESS' })));
}));

export class SkysmackEpics {
    public epics: Epic[];
    protected prefix = 'SKYSMACK_';

    constructor(
        protected requests: SkysmackRequests
    ) {
        this.epics = [
            this.get
        ];
    }

    public get = (action$) => {
        return action$.pipe(
            ofType(SkysmackActions.GET_SKYSMACK),
            switchMap(() => this.requests.get()),
        );
    }
}



export const configureRedux = (ngRedux: NgRedux<any>, ngReduxRouter: NgReduxRouter, reduxOfflineConfiguration: ReduxOfflineConfiguration, injector: Injector) => {
    const initialState: DeepPartial<any> = {};
    const offlineEnhancer = createOffline(reduxOfflineConfiguration);
    const epicMiddleware: EpicMiddleware<AnyAction> = createEpicMiddleware();

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // Preserve initial state for not-yet-loaded reducers
    const combine = (reducers: Reducer<{}, AnyAction>) => {
        const reducerNames = Object.keys(reducers);
        Object.keys(initialState).forEach(item => {
            if (reducerNames.indexOf(item) === -1) {
                reducers[item] = (state = null) => state;
            }
        });
        return combineReducers(reducers);
    };

    const reducerRegistry = ReducerRegistry.Instance;
    reducerRegistry.register('portal', portalReducer);
    reducerRegistry.register('hydrated', hydratedReducer);
    const rootReducer = combine(reducerRegistry.getReducers());

    const store: Store<any> = createStore(
        offlineEnhancer.enhanceReducer(rootReducer),
        initialState,
        composeEnhancers(
            offlineEnhancer.enhanceStore,
            applyMiddleware(offlineEnhancer.middleware as any, epicMiddleware),
        )
    );

    // Replace the store's reducer whenever a new reducer is registered.
    reducerRegistry.setChangeListener(reducers => {
        store.replaceReducer(combine(reducers));
    });

    ngRedux.provideStore(store);

    epicMiddleware.run((action$, state$) => epic$.pipe(
        mergeMap(epic => epic(action$, state$, {}))
    ));

    // TODO: Register elsewhere + remember to remove doc epics from redux package.
    newEpics$.next(new SkysmackEpics(injector.get('SkysmackRequests')));

    newEpics$.subscribe(x => {
        if (x.epics) {
            x.epics.forEach(epic => epic$.next(epic));
        }
    });

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
        ngReduxRouter.initialize();
    }
};
