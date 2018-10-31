import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { createStore, Store, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { RootEpics, rootReducer, IAppState } from './hello';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    RouterModule
  ],
  providers: [RootEpics],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public rootEpics: RootEpics
  ) {
    // this.configureRedux();
  }

  // configureRedux(): any {
  //   const epicMiddleware = createEpicMiddleware();
  //   const store: Store<any> = createStore(
  //     rootReducer,
  //     {},
  //   );

  //   this.ngRedux.provideStore(store);

  //   epicMiddleware.run(this.rootEpics.getEpics());
  // }
}
