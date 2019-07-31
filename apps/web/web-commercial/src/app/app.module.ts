import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@skysmack/portal-ui';
import { commercialAccountRoute } from './packages/commercial_account_wrapper.module';
import { GlobalProperties } from '@skysmack/framework';
import { environment } from '../environments/environment';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReduxOfflineConfiguration, configureRedux } from '@skysmack/ng-framework';
import { HttpClientModule } from '@angular/common/http';
import { commercialApplicationStartup } from './commercial-application-startup';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      commercialAccountRoute,
    ], { initialNavigation: 'enabled' }),
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    ...commercialApplicationStartup
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public ngRedux: NgRedux<any>,
    public ngReduxRouter: NgReduxRouter,
    public reduxOfflineConfiguration: ReduxOfflineConfiguration,
  ) {
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
    GlobalProperties.production = environment.production;
  }
}
