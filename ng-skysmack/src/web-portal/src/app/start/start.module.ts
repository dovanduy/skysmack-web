import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { SkysmackModule } from '@skysmack/portal-packages';
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
import { NgFieldEpics, registerRedux, NgSettingsEpics } from '@skysmack/ng-redux';
import { fieldReducer, settingsReducer } from '@skysmack/redux';
// import { NgxGraphModule } from '@swimlane/ngx-graph';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// NgxGraphModule,
//   NgxChartsModule,

@NgModule({
  declarations: [
    StartComponent,
    FrontPageComponent,
    FallBackComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'skysmack/packages',
        loadChildren: './../packages/modules/packages_wrapper.module#PackagesWrapperModule'
      },
      {
        path: 'skysmack/access-policies',
        loadChildren: './../packages/modules/access_policies_wrapper.module#AccessPoliciesWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/identities',
        loadChildren: './../packages/modules/identities_wrapper.module#IdentitiesWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/persons',
        loadChildren: './../packages/modules/persons_wrapper.module#PersonsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/invoices',
        loadChildren: './../packages/modules/invoices_wrapper.module#InvoicesWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/baskets',
        loadChildren: './../packages/modules/baskets_wrapper.module#BasketsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/products',
        loadChildren: './../packages/modules/products_wrapper.module#ProductsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/products-pricings',
        loadChildren: './../packages/modules/products_pricings_wrapper.module#ProductsPricingsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/lodgings',
        loadChildren: './../packages/modules/lodgings_wrapper.module#LodgingsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/lodgingReservations',
        loadChildren: './../packages/modules/lodging_reservations_wrapper.module#LodgingReservationsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/personsLodgingReservations',
        loadChildren: './../packages/modules/persons_lodging_reservations_wrapper.module#PersonsLodgingReservationsWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/oauth2',
        loadChildren: './../packages/modules/oauth2_wrapper.module#OAuth2WrapperModule'
      },
      {
        path: 'skysmack/loadPackages/maintenance',
        loadChildren: './../packages/modules/maintenance_wrapper.module#MaintenanceWrapperModule'
      },
      {
        path: 'skysmack/loadPackages/terminal-payments',
        loadChildren: './../packages/modules/terminal_payments_wrapper.module#TerminalPaymentsWrapperModule'
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
    console.log('1');
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
    registerRedux('fields', fieldReducer, fieldEpics);
    registerRedux('settings', settingsReducer, settingsEpics);
    GlobalProperties.production = environment.production;
  }
}
