// Do not remove these import
import { PackagesModule } from '../../../../../projects/portal-packages/src/lib/packages/packages.module';
import { PersonsModule } from '../../../../../projects/portal-packages/src/lib/persons/persons.module';

import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SkysmackModule } from './../../../../../projects/portal-packages/src/lib/skysmack/skysmack.module';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ReduxOfflineConfiguration } from '../redux/redux-offline.configuration';
import { PortalUiModule } from './../../../../../projects/portal-ui/src/lib/portal-ui.module';
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { StartComponent } from './components/start/start.component';
import { configureRedux } from '../redux/redux.configuration';
import { applicationStartup } from './application-startup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    StartComponent,
    FrontPageComponent,
    FallBackComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'packages',
        loadChildren: '../../../../../projects/portal-packages/src/lib/packages/packages.module#PackagesModule'
      },
      {
        path: 'persons',
        loadChildren: '../../../../../projects/portal-packages/src/lib/persons/persons.module#PersonsModule'
      },
      {
        path: 'products',
        loadChildren: '../../../../../projects/portal-packages/src/lib/products/products.module#ProductsModule'
      },
      {
        path: 'lodgings',
        loadChildren: '../../../../../projects/portal-packages/src/lib/lodgings/lodgings.module#LodgingsModule'
      },
      {
        path: 'oauth2',
        loadChildren: '../../../../../projects/portal-packages/src/lib/oauth2/oauth2.module#Oauth2Module'
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
    public reduxOfflineConfiguration: ReduxOfflineConfiguration,
  ) {
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
  }
}
