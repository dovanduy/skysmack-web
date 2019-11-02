import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { RouterModule } from '@angular/router';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgFieldEpics, registerRedux, NgSettingsEpics, CoalescingComponentFactoryResolver, ReduxOfflineConfiguration, configureRedux } from '@skysmack/ng-framework';
import { PortalUiModule } from '@skysmack/portal-ui';
import { NgSkysmackModule, NgSkysmackEpics } from '@skysmack/ng-skysmack';
import { SKYSMACK_REDUCER_KEY, skysmackReducer } from '@skysmack/packages-skysmack-core';
import { LanguageService } from '@skysmack/ng-translation';
import { GlobalProperties } from '@skysmack/framework';
import { fieldsReducer, settingsReducer } from '@skysmack/redux';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { FallBackComponent } from './components/fall-back/fall-back.component';
import { StartComponent } from './components/start/start.component';
import { applicationStartup } from './application-startup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TenantPackageLoadStrategy } from './tenant-package-load-strategy';
import { packagesRoutes } from '../packages/packages-routes';
import { environment } from './../../environments/environment';
// import { NgxGraphModule } from '@swimlane/ngx-graph';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// NgxGraphModule,
// NgxChartsModule,

const routes = [
  ...packagesRoutes,
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
];

@NgModule({
  declarations: [
    StartComponent,
    FrontPageComponent,
    FallBackComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: TenantPackageLoadStrategy }),
    BrowserAnimationsModule,
    HttpClientModule,
    PortalUiModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    NgSkysmackModule, // SkysmackModule must come after NgReduxModule
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
    registerRedux('fields', fieldsReducer, fieldEpics);
    registerRedux('settings', settingsReducer, settingsEpics);
    GlobalProperties.production = environment.production;
    coalescingResolver.init();
  }
}
