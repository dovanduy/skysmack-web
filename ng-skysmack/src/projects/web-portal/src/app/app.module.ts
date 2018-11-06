import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { ReduxOfflineConfiguration } from './redux-offline.configuration';
import { configureRedux } from './redux.configuration';
import { HttpClientModule } from '@angular/common/http';

// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { PersonsModule } from './../../../../lib/portal-packages/persons/persons.module';
import { SkysmackModule } from './../../../../lib/portal-packages/skysmack/skysmack.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'persons',
        loadChildren: '../../../../lib/portal-packages/persons/persons.module#PersonsModule'
      },
      {
        path: 'skysmack',
        loadChildren: '../../../../lib/portal-packages/skysmack/skysmack.module#SkysmackModule'
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public ngRedux: NgRedux<any>,
    public ngReduxRouter: NgReduxRouter,
    public reduxOfflineConfiguration: ReduxOfflineConfiguration
  ) {
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
  }
}
