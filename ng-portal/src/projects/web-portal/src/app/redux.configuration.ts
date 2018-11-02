import { NgReduxRouter } from '@angular-redux/router';
import { NgRedux } from '@angular-redux/store';
import { createOffline } from '@redux-offline/redux-offline';
import { applyMiddleware, compose, createStore, DeepPartial, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { IAppState, rootReducer, RootEpics } from './store';
import { ReduxOfflineConfiguration } from './redux-offline.configuration';

export const configureRedux = (ngRedux: NgRedux<IAppState>, ngReduxRouter: NgReduxRouter, reduxOfflineConfiguration: ReduxOfflineConfiguration, rootEpics: RootEpics) => {
    const initialState: DeepPartial<any> = {};
    const offlineEnhancer = createOffline(reduxOfflineConfiguration);
    const epicMiddleware = createEpicMiddleware();

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store: Store<IAppState> = createStore(
        offlineEnhancer.enhanceReducer(rootReducer),
        initialState,
        composeEnhancers(
            offlineEnhancer.enhanceStore,
            applyMiddleware(offlineEnhancer.middleware as any, epicMiddleware),
        )
    );

    ngRedux.provideStore(store);

    epicMiddleware.run(rootEpics.getEpics());

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
        ngReduxRouter.initialize();
    }
};
