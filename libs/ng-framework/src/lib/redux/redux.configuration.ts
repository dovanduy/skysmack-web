import { NgReduxRouter } from '@angular-redux/router';
import { NgRedux } from '@angular-redux/store';
import { createOffline } from '@redux-offline/redux-offline';
import { applyMiddleware, compose, createStore, DeepPartial, Store, combineReducers, AnyAction, Reducer } from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { ReducerRegistry, queueReducer, hydratedReducer } from '@skysmack/redux';
import { mergeMap } from 'rxjs/operators';
import { ReduxOfflineConfiguration } from './redux-offline.configuration';
import { epic$ } from '../epics/ng-root-epic';

export const configureRedux = (ngRedux: NgRedux<any>, ngReduxRouter: NgReduxRouter, reduxOfflineConfiguration: ReduxOfflineConfiguration) => {
    const initialState: DeepPartial<any> = {};
    // const offlineEnhancer = createOffline(reduxOfflineConfiguration);
    const { middleware, enhanceReducer, enhanceStore } = createOffline(reduxOfflineConfiguration);
    const epicMiddleware: EpicMiddleware<AnyAction> = createEpicMiddleware();

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // Preserve initial state for not-yet-loaded reducers
    const combine = (reducers: Reducer<{}, AnyAction>): Reducer<{}, AnyAction> => {
        const reducerNames = Object.keys(reducers);
        Object.keys(initialState).forEach(item => {
            if (reducerNames.indexOf(item) === -1) {
                reducers[item] = (state = null) => state;
            }
        });
        return combineReducers(reducers);
    };

    const reducerRegistry = ReducerRegistry.Instance;
    reducerRegistry.register('hydrated', hydratedReducer);
    reducerRegistry.register('queue', queueReducer);
    const rootReducer = combine(reducerRegistry.getReducers());

    const store: Store<any> = createStore(
        enhanceReducer(rootReducer),
        composeEnhancers(
            enhanceStore,
            applyMiddleware(middleware, epicMiddleware),
        )
    );

    // Replace the store's reducer whenever a new reducer is registered.
    reducerRegistry.setChangeListener(reducers => store.replaceReducer(combine(reducers)));

    ngRedux.provideStore(store);

    epicMiddleware.run((action$, state$) => epic$.pipe(mergeMap(epic => epic(action$, state$, {}))));

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
        ngReduxRouter.initialize();
    }
};
