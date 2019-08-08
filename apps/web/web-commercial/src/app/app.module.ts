import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';

import { GlobalProperties } from '@skysmack/framework';
import { ReducerRegistry, authenticationReducer } from '@skysmack/redux';
import { ReduxOfflineConfiguration, configureRedux, CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { NgOAuth2Module } from '@skysmack/ng-oauth2';
import { MaterialModule } from '@skysmack/portal-ui';

import { AppComponent } from './app.component';
import { commercialAccountRoute } from './packages/commercial_account_wrapper.module';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { commercialApplicationStartup } from './commercial-application-startup';
import { commercialTenantsRoute } from './packages/commercial_tenants_wrapper.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgOAuth2Module,
    RouterModule.forRoot([
      commercialAccountRoute,
      commercialTenantsRoute
    ], { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    ...commercialApplicationStartup,
    CoalescingComponentFactoryResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public ngRedux: NgRedux<any>,
    public ngReduxRouter: NgReduxRouter,
    public reduxOfflineConfiguration: ReduxOfflineConfiguration,
    public coalescingResolver: CoalescingComponentFactoryResolver
  ) {
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
    GlobalProperties.production = environment.production;
    ReducerRegistry.Instance.register('authentication', authenticationReducer);

    coalescingResolver.init();
  }
}
