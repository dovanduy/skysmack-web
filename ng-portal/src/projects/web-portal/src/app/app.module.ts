import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PersonsModule } from 'packages/persons';

import { createStore, Store, combineReducers, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { IAppState, RootEpics, rootReducer } from './redux.configuration';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    PersonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public ngReduxRouter: NgReduxRouter,
    public rootEpics: RootEpics
  ) {
    this.configureRedux();
  }


  configureRedux(): any {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const epicMiddleware = createEpicMiddleware();
    const store: Store<any> = createStore(
      rootReducer,
      {},
      composeEnhancers()
    );

    this.ngRedux.provideStore(store);

    epicMiddleware.run(this.rootEpics.getEpics());

    // Enable syncing of Angular router state with our Redux store.
    if (this.ngReduxRouter) {
      this.ngReduxRouter.initialize();
    }
  }
}
