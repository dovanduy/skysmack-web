// Do not delete

import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SkysmackModule } from './../../../../../lib/portal-packages/skysmack/skysmack.module';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ReduxOfflineConfiguration } from '../redux/redux-offline.configuration';
import { PortalUiModule } from './../../../../../lib/portal-ui/portal-ui.module';
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { StartComponent } from './components/start/start.component';
import { configureRedux } from '../redux/redux.configuration';
import { applicationStartup } from './application-startup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { AuthenticationModule } from 'lib/portal-packages/authentication';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/');
}

@NgModule({
  declarations: [
    StartComponent,
    FrontPageComponent,
    FallBackComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'persons',
        loadChildren: '../../../../../lib/portal-packages/persons/persons.module#PersonsModule'
      },
      {
        path: 'products',
        loadChildren: '../../../../../lib/portal-packages/products/products.module#ProductsModule'
      },
      {
        path: 'lodgings',
        loadChildren: '../../../../../lib/portal-packages/lodgings/lodgings.module#LodgingsModule'
      },
      {
        path: 'login',
        loadChildren: '../../../../../lib/portal-packages/authentication/authentication.module#AuthenticationModule'
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PortalUiModule,
    AuthenticationModule,
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
