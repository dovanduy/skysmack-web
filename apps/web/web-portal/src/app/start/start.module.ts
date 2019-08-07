import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { RouterModule } from '@angular/router';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { PortalUiModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui'
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { StartComponent } from './components/start/start.component';
import { applicationStartup } from './application-startup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './../../environments/environment';
import { GlobalProperties } from '@skysmack/framework';
import { NgFieldEpics, registerRedux, NgSettingsEpics, CoalescingComponentFactoryResolver, ReduxOfflineConfiguration, configureRedux } from '@skysmack/ng-framework';
import { fieldReducer, settingsReducer } from '@skysmack/redux';
import { TenantPackageLoadStrategy } from './tenant-package-load-strategy';
import { packagesRoute } from '../packages/packages-package-manifest';
import { accessPoliciesRoute } from '../packages/access-policies-package-manifest';
import { identitiesRoute } from '../packages/identities-package-manifest';
import { personsRoute } from '../packages/persons-package-manifest';
import { invoicesRoute } from '../packages/invoices-package-manifest';
import { invoicesCashPaymentsRoute } from '../packages/invoices-cash-payments-package-manifest';
import { productsRoute } from '../packages/products-package-manifest';
import { productsPricingsRoute } from '../packages/products-pricings-package-manifest';
import { lodgingsRoute } from '../packages/lodgings-package-manifest';
import { lodgingReservationsRoute } from '../packages/lodging-reservations-package-manifest';
import { reservationsPricingsRoute } from '../packages/reservations-pricings-package-manifest';
import { personsLodgingReservationsRoute } from '../packages/persons-lodging-reservations-package-manifest';
import { OAuth2Route } from '../packages/oauth2-package-manifest';
import { maintenanceRoute } from '../packages/maintenance-package-manifest';
import { emailsRoute } from '../packages/emails-package-manifest';
import { emailsSmtpRoute } from '../packages/emails-smtp-package-manifest';
import { terminalPaymentsRoute } from '../packages/terminal-payments-manifest';
import { invoicesProductsRoute } from '../packages/invoices-products-package-manifest';
import { NgSkysmackModule, NgSkysmackEpics } from '@skysmack/ng-skysmack';
import { SKYSMACK_REDUCER_KEY, skysmackReducer } from '@skysmack/packages-skysmack-core';
import { openApiRoute } from '../packages/open-api-package-manifest';
// import { NgxGraphModule } from '@swimlane/ngx-graph';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// NgxGraphModule,
// NgxChartsModule,

@NgModule({
  declarations: [
    StartComponent,
    FrontPageComponent,
    FallBackComponent
  ],
  imports: [
    RouterModule.forRoot([
      packagesRoute,
      accessPoliciesRoute,
      identitiesRoute,
      personsRoute,
      invoicesRoute,
      invoicesProductsRoute,
      invoicesCashPaymentsRoute,
      productsRoute,
      productsPricingsRoute,
      lodgingsRoute,
      lodgingReservationsRoute,
      reservationsPricingsRoute,
      personsLodgingReservationsRoute,
      OAuth2Route,
      maintenanceRoute,
      terminalPaymentsRoute,
      emailsRoute,
      emailsSmtpRoute,
      openApiRoute,
      {
        path: '',
        component: FrontPageComponent,
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: FallBackComponent
      }
    ], {
        preloadingStrategy: TenantPackageLoadStrategy
      }),
    BrowserAnimationsModule,
    HttpClientModule,
    PortalUiModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    NgSkysmackModule, // SkysmackModule must come after NgReduxModule
    // SkysmackModule, 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    applicationStartup,
    LanguageService,
    CoalescingComponentFactoryResolver,
    SystemJsNgModuleLoader
  ],
  bootstrap: [StartComponent]
})
export class StartModule {
  constructor(
    public ngRedux: NgRedux<any>,
    public ngReduxRouter: NgReduxRouter,
    public reduxOfflineConfiguration: ReduxOfflineConfiguration,
    public skysmackEpics: NgSkysmackEpics,
    public fieldEpics: NgFieldEpics,
    public settingsEpics: NgSettingsEpics,
    public coalescingResolver: CoalescingComponentFactoryResolver
  ) {
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
    registerRedux(SKYSMACK_REDUCER_KEY, skysmackReducer, skysmackEpics);
    registerRedux('fields', fieldReducer, fieldEpics);
    registerRedux('settings', settingsReducer, settingsEpics);
    GlobalProperties.production = environment.production;
    coalescingResolver.init();
  }
}
