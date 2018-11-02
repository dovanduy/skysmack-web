import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
// import { PersonsModule } from 'packages/persons';

import { createStore, Store, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { IAppState, RootEpics, rootReducer } from './store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { ReduxOfflineConfiguration } from './redux-offline.configuration';
import { configureRedux } from './redux.configuration';
import { HttpClientModule } from '@angular/common/http';
import { PersonsModule } from 'packages/persons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot([]),
    BrowserModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    PersonsModule
  ],
  providers: [
    RootEpics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public ngReduxRouter: NgReduxRouter,
    public rootEpics: RootEpics,
    public reduxOfflineConfiguration: ReduxOfflineConfiguration
  ) {
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration, rootEpics);
  }
}
