import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { RouterModule } from '@angular/router';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { StartComponent } from './components/start/start.component';
import { ReduxOfflineConfiguration } from '../redux/redux-offline.configuration';
import { configureRedux } from '../redux/redux.configuration';
import { applicationStartup } from './application-startup';
import { SkysmackModule } from './../../../../../lib/portal-packages/skysmack/skysmack.module';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { PortalUiModule } from './../../../../../lib/portal-ui/portal-ui.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// DO NOT DELETE - BUILD FAILS IF REMOVED >:(
import { PersonsModule } from './../../../../../lib/portal-packages/persons/persons.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/');
}

@NgModule({
  declarations: [
    StartComponent,
    FrontPageComponent,
    FallBackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {
        path: 'persons',
        loadChildren: '../../../../../lib/portal-packages/persons/persons.module#PersonsModule'
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
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    SkysmackModule,
    PortalUiModule
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

    console.log('BrowserModule', JSON.stringify(BrowserModule, undefined, 2));
    console.log('HttpClientModule', JSON.stringify(HttpClientModule, undefined, 2));
    console.log('TranslateModule', JSON.stringify(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }), undefined, 2));
    console.log('RouterModule', JSON.stringify(RouterModule.forRoot([
      {
        path: 'persons',
        loadChildren: '../../../../../lib/portal-packages/persons/persons.module#PersonsModule'
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
    ]), undefined, 2));
    console.log('NgReduxModule', JSON.stringify(NgReduxModule, undefined, 2));
    console.log('NgReduxRouterModule.forRoot()', JSON.stringify(NgReduxRouterModule.forRoot(), undefined, 2));
    console.log('SkysmackModule', JSON.stringify(SkysmackModule, undefined, 2));
    console.log('PortalUiModule', JSON.stringify(PortalUiModule, undefined, 2));
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
  }
}
