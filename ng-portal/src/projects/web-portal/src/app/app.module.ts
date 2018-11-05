import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { IAppState, RootEpics } from './store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { ReduxOfflineConfiguration } from './redux-offline.configuration';
import { configureRedux } from './redux.configuration';
import { HttpClientModule } from '@angular/common/http';

// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { PersonsModule } from './../../../../lib/packages/persons/persons.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'persons',
        loadChildren: '../../../../lib/packages/persons/persons.module#PersonsModule'
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]),
    BrowserModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot()
  ],
  providers: [
    RootEpics,
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
