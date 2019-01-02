import { NgReduxRouter } from '@angular-redux/router';
import { NgRedux } from '@angular-redux/store';
import { createOffline } from '@redux-offline/redux-offline';
import { applyMiddleware, compose, createStore, DeepPartial, Store, combineReducers, AnyAction } from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { ReduxOfflineConfiguration } from './redux-offline.configuration';
import { ReducerRegistry, epic$ } from '@skysmack/redux';
import { portalReducer } from './portal-reducer';
import { hydratedReducer } from './hydrated-reducer';

export const configureRedux = (ngRedux: NgRedux<any>, ngReduxRouter: NgReduxRouter, reduxOfflineConfiguration: ReduxOfflineConfiguration) => {
    const initialState: DeepPartial<any> = {};
    const offlineEnhancer = createOffline(reduxOfflineConfiguration);
    const epicMiddleware: EpicMiddleware<AnyAction> = createEpicMiddleware();

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // Preserve initial state for not-yet-loaded reducers
    const combine = (reducers) => {
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

    epic$.subscribe(rootEpic => epicMiddleware.run(rootEpic));

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
        ngReduxRouter.initialize();
    }
};