import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgFrameworkModule, ReduxOfflineConfiguration, configureRedux, registerRedux } from '@skysmack/ng-framework';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { hotelBookingApplicationStartup } from './hotel-booking-application-startup';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSkysmackModule, NgSkysmackEpics } from '@skysmack/ng-skysmack';
import { SKYSMACK_REDUCER_KEY, skysmackReducer } from '@skysmack/packages-skysmack-core';
import { GuestsComponent } from './components/guests/guests.component';
import { DatesComponent } from './components/dates/dates.component';
import { LodgingsComponent } from './components/lodgings/lodgings.component';
import { SummaryComponent } from './components/summary/summary.component';
import { StepsComponent } from './components/steps/steps.component';
import { SharedModule } from './modules/shared.module';

const material = [
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatProgressBarModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule
];

const skysmackModules = [
  NgSkysmackModule,
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/guests',
        pathMatch: 'full'
      },
      {
        path: 'guests',
        component: GuestsComponent
      },
      {
        path: 'date',
        component: DatesComponent
      },
      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: 'lodgings',
        loadChildren: './modules/ng_lodgings_wrapper.module#NgLodgingsWrapperModule',
      }
    ]),
    SharedModule,
    ...skysmackModules,
    BrowserAnimationsModule,
    NgReduxModule,
    NgFrameworkModule,
    NgReduxRouterModule.forRoot(),
    ...skysmackModules,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ...material
  ],
  declarations: [
    AppComponent,
    GuestsComponent,
    DatesComponent,
    SummaryComponent
  ],
  exports: [
    StepsComponent
  ],
  entryComponents: [],
  providers: [
    ...hotelBookingApplicationStartup,
    SystemJsNgModuleLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<any>,
    ngReduxRouter: NgReduxRouter,
    reduxOfflineConfiguration: ReduxOfflineConfiguration,
    skysmackEpics: NgSkysmackEpics
  ) {
    console.log('1');
    configureRedux(ngRedux, ngReduxRouter, reduxOfflineConfiguration);
    registerRedux(SKYSMACK_REDUCER_KEY, skysmackReducer, skysmackEpics);
  }
}
