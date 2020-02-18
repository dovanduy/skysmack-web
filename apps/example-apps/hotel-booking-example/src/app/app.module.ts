import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgFrameworkModule } from '@skysmack/ng-framework';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { StartComponent } from './pages/start/start.component';
import { WhyComponent } from './pages/why/why.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { ProductsComponent } from './pages/products/products.component';
import { PricingsComponent } from './pages/pricings/pricings.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { hotelBookingApplicationStartup } from './hotel-booking-application-startup';


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
    ReactiveFormsModule,
    RouterModule.forRoot([
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
    ]),
    BrowserAnimationsModule,
    NgFrameworkModule,
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
    GettingStartedComponent
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
  ) { }
}
