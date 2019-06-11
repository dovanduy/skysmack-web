import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { SkysmackModule } from '@skysmack/portal-core';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ReduxOfflineConfiguration } from '../redux/redux-offline.configuration';
import { PortalUiModule, LanguageService } from '@skysmack/portal-ui';
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
        loadChildren: () => import('./../packages/modules/packages_wrapper.module').then(m => m.PackagesWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/access-policies',
        loadChildren: () => import('./../packages/modules/access_policies_wrapper.module').then(m => m.AccessPoliciesWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/identities',
        loadChildren: () => import('./../packages/modules/identities_wrapper.module').then(m => m.IdentitiesWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/persons',
        loadChildren: () => import('./../packages/modules/persons_wrapper.module').then(m => m.PersonsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/invoices',
        loadChildren: () => import('./../packages/modules/invoices_wrapper.module').then(m => m.InvoicesWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/invoices-cash-payments',
        loadChildren: () => import('./../packages/modules/invoices_cash_payments_wrapper.module').then(m => m.InvoicesCashPaymentsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/products',
        loadChildren: () => import('./../packages/modules/products_wrapper.module').then(m => m.ProductsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/products-pricings',
        loadChildren: () => import('./../packages/modules/products_pricings_wrapper.module').then(m => m.ProductsPricingsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/lodgings',
        loadChildren: () => import('./../packages/modules/lodgings_wrapper.module').then(m => m.LodgingsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/lodgingReservations',
        loadChildren: () => import('./../packages/modules/lodging_reservations_wrapper.module').then(m => m.LodgingReservationsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/reservations-pricings',
        loadChildren: () => import('./../packages/modules/reservations_pricings_wrapper.module').then(m => m.ReservationsPricingsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/personsLodgingReservations',
        loadChildren: () => import('./../packages/modules/persons_lodging_reservations_wrapper.module').then(m => m.PersonsLodgingReservationsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/oauth2',
        loadChildren: () => import('./../packages/modules/oauth2_wrapper.module').then(m => m.OAuth2WrapperModule)
      },
      {
        path: 'skysmack/loadPackages/maintenance',
        loadChildren: () => import('./../packages/modules/maintenance_wrapper.module').then(m => m.MaintenanceWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/terminal-payments',
        loadChildren: () => import('./../packages/modules/terminal_payments_wrapper.module').then(m => m.TerminalPaymentsWrapperModule)
      },
      {
        path: 'skysmack/loadPackages/account',
        loadChildren: () => import('./../packages/modules/account_wrapper.module').then(m => m.AccountWrapperModule)
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
