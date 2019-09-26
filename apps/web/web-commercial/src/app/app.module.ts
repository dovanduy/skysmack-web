import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { RouterModule, Router } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';

import { GlobalProperties } from '@skysmack/framework';
import { ReducerRegistry, authenticationReducer } from '@skysmack/redux';
import { ReduxOfflineConfiguration, configureRedux, CoalescingComponentFactoryResolver, NgFrameworkModule } from '@skysmack/ng-framework';
import { NgOAuth2Module } from '@skysmack/ng-oauth2';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { commercialApplicationStartup } from './commercial-application-startup';
import { StartComponent } from './pages/start/start.component';
import { WhyComponent } from './pages/why/why.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { ProductsComponent } from './pages/products/products.component';
import { PricingsComponent } from './pages/pricings/pricings.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { NgTranslationModule, LanguageService, CommercialHttpLoaderFactory } from '@skysmack/ng-translation';
import { AuthenticatedLoadStrategy } from './authenticated-load-strategy';
import { CommercialUiPartnersModule } from '@skysmack/commercial-ui-partners';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { NewsLetterComponent } from './pages/newsletter/newsletter.component';


const material = [
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatProgressBarModule,
  MatInputModule
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgOAuth2Module,
    NgTranslationModule.forRoot(CommercialHttpLoaderFactory),
    RouterModule.forRoot([
      { path: 'account', loadChildren: './packages/commercial_account_wrapper.module#CommercialAccountWrapperModule' },
      { path: 'tenants', loadChildren: './packages/commercial_tenants_wrapper.module#CommercialTenantsWrapperModule' },
      { path: 'databases', loadChildren: './packages/commercial_databases_wrapper.module#CommercialDatabasesWrapperModule' },
      { path: 'users', loadChildren: './packages/commercial_users_wrapper.module#CommercialUsersWrapperModule' },
      { path: 'open-api', loadChildren: './packages/commercial_open_api_wrapper.module#CommercialOpenApiWrapperModule' },
      {
        path: '',
        component: StartComponent
      },
      {
        path: 'why',
        component: WhyComponent
      },
      {
        path: 'solutions',
        component: SolutionsComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'pricings',
        component: PricingsComponent
      },
      {
        path: 'getting-started',
        component: GettingStartedComponent
      },
    ], {
      initialNavigation: 'enabled',
      preloadingStrategy: AuthenticatedLoadStrategy,
      scrollPositionRestoration: 'enabled'
    }),
    BrowserAnimationsModule,
    CommercialUiPartnersModule,
    NgReduxModule,
    NgFrameworkModule,
    NgReduxRouterModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ...material
  ],
  declarations: [
    AppComponent,
    StartComponent,
    WhyComponent,
    SolutionsComponent,
    ProductsComponent,
    PricingsComponent,
    GettingStartedComponent,
    NewsLetterComponent
  ],
  entryComponents: [
    NewsLetterComponent
  ],
  providers: [
    ...commercialApplicationStartup,
    LanguageService,
    CoalescingComponentFactoryResolver,
    SystemJsNgModuleLoader
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
