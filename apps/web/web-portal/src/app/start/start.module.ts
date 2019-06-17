import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { SkysmackModule } from '@skysmack/portal-core';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ReduxOfflineConfiguration } from '../redux/redux-offline.configuration';
import { PortalUiModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui'
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { StartComponent } from './components/start/start.component';
import { configureRedux } from './../redux/redux.configuration';
import { applicationStartup } from './application-startup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './../../environments/environment';
import { GlobalProperties } from '@skysmack/framework';
import { NgFieldEpics, registerRedux, NgSettingsEpics } from '@skysmack/ng-framework';
import { fieldReducer, settingsReducer } from '@skysmack/redux';
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
      {
        path: 'skysmack/loadPackages/packages',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.PackagesModule)
        loadChildren: './../packages/modules/packages_wrapper.module#PackagesWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/access-policies',
        // loadChildren: () => import('@skysmack/portal-core').then(m => m.AccessPoliciesModule)
        loadChildren: './../packages/modules/access_policies_wrapper.module#AccessPoliciesWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/identities',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.IdentitiesModule)
        loadChildren: './../packages/modules/identities_wrapper.module#IdentitiesWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/persons',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.PersonsModule)
        loadChildren: './../packages/modules/persons_wrapper.module#PersonsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/invoices',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.InvoicesModule)
        loadChildren: './../packages/modules/invoices_wrapper.module#InvoicesWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/invoices-cash-payments',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.InvoicesCashPaymentsModule)
        loadChildren: './../packages/modules/invoices_cash_payments_wrapper.module#InvoicesCashPaymentsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/products',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.ProductsModule)
        loadChildren: './../packages/modules/products_wrapper.module#ProductsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/products-pricings',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.ProductsPricingsModule)
        loadChildren: './../packages/modules/products_pricings_wrapper.module#ProductsPricingsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/lodgings',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.LodgingsModule)
        loadChildren: './../packages/modules/lodgings_wrapper.module#LodgingsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/lodgingReservations',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.LodgingReservationsModule)
        loadChildren: './../packages/modules/lodging_reservations_wrapper.module#LodgingReservationsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/reservations-pricings',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.ReservationsPricingsModule)
        loadChildren: './../packages/modules/reservations_pricings_wrapper.module#ReservationsPricingsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/personsLodgingReservations',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.PersonsLodgingReservationsModule)
        loadChildren: './../packages/modules/persons_lodging_reservations_wrapper.module#PersonsLodgingReservationsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/oauth2',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.Oauth2Module)
        loadChildren: './../packages/modules/oauth2_wrapper.module#OAuth2WrapperModule'
      },
      {
        path: 'skysmack/loadPackages/maintenance',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.MaintenanceModule)
        loadChildren: './../packages/modules/maintenance_wrapper.module#MaintenanceWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/terminal-payments',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.TerminalPaymentsModule)
        loadChildren: './../packages/modules/terminal_payments_wrapper.module#TerminalPaymentsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/emails',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.EmailsModule)
        loadChildren: './../packages/modules/emails_wrapper.module#EmailsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/emails-smtp',
        // loadChildren: () => import('@skysmack/portal-packages').then(m => m.EmailsSmtpModule)
        loadChildren: './../packages/modules/emails_smtp_wrapper.module#EmailsSmtpWrapperModule'
      },
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
        preloadingStrategy: PreloadAllModules
      }),
    BrowserAnimationsModule,
    HttpClientModule,
    PortalUiModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    SkysmackModule, // SkysmackModule must come after NgReduxModule
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    applicationStartup,
    LanguageService
  ],
  bootstrap: [StartComponent]
})
export class StartModule {
  constructor(
    public ngRedux: NgRedux<any>,
    public ngReduxRouter: NgReduxRouter,
    public reduxOfflineConfiguration: ReduxOfflineConfiguration,
    public fieldEpics: NgFieldEpics,
    public settingsEpics: NgSettingsEpics
  ) {
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
    registerRedux('fields', fieldReducer, fieldEpics);
    registerRedux('settings', settingsReducer, settingsEpics);
    GlobalProperties.production = environment.production;
  }
}
