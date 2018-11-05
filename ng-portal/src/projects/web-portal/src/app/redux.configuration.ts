import { NgReduxRouter } from '@angular-redux/router';
import { NgRedux } from '@angular-redux/store';
import { createOffline } from '@redux-offline/redux-offline';
import { applyMiddleware, compose, createStore, DeepPartial, Store, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { IAppState, portalReducer } from './store';
import { ReduxOfflineConfiguration } from './redux-offline.configuration';
import { ReducerRegistry, rootEpic } from '@skysmack/redux';

export const configureRedux = (ngRedux: NgRedux<IAppState>, ngReduxRouter: NgReduxRouter, reduxOfflineConfiguration: ReduxOfflineConfiguration) => {
    const initialState: DeepPartial<any> = {};
    const offlineEnhancer = createOffline(reduxOfflineConfiguration);
    const epicMiddleware = createEpicMiddleware();

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
    const rootReducer = combine(reducerRegistry.getReducers());

    const store: Store<IAppState> = createStore(
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

    epicMiddleware.run(rootEpic);

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
        ngReduxRouter.initialize();
    }
};
