import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { RouterModule } from '@angular/router';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';

import { StartComponent } from './components/start/start.component';
import { ReduxOfflineConfiguration } from '../redux/redux-offline.configuration';
import { configureRedux } from '../redux/redux.configuration';
import { applicationStartup } from './application-startup';
import { SkysmackModule } from './../../../../../lib/portal-packages/skysmack/skysmack.module';

// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { PersonsModule } from './../../../../../lib/portal-packages/persons/persons.module';
import { FrontPageComponent } from './components/front-page/front-page.component';

@NgModule({
  declarations: [
    StartComponent,
    FrontPageComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'persons',
        loadChildren: '../../../../../lib/portal-packages/persons/persons.module#PersonsModule'
      },
      {
        path: '',
        component: FrontPageComponent,
        redirectTo: '',
        pathMatch: 'full'
      }
    ]),
    SkysmackModule,
    BrowserModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot()
  ],
  providers: [
    applicationStartup
  ],
  bootstrap: [StartComponent]
})
export class StartModule {
  constructor(
    public ngRedux: NgRedux<any>,
    public ngReduxRouter: NgReduxRouter,
    public reduxOfflineConfiguration: ReduxOfflineConfiguration
  ) {
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
  }
}
