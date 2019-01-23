// Do not remove these import
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SkysmackModule } from '@skysmack/portal-packages';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ReduxOfflineConfiguration } from '../redux/redux-offline.configuration';
import { PortalUiModule } from '@skysmack/portal-ui';
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { StartComponent } from './components/start/start.component';
import { configureRedux } from './../redux/redux.configuration';
import { applicationStartup } from './application-startup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './../../environments/environment';

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
        path: 'skysmack/loadPackages/products',
        loadChildren: './../packages/modules/products_wrapper.module#ProductsWrapperModule'
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
    ]),
    BrowserAnimationsModule,
    HttpClientModule,
    PortalUiModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    SkysmackModule, // SkysmackModule must come after NgReduxModule
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
