import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { NgIdentitiesModule, NgLodgingReservationsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, DynamicFieldsModule } from '@skysmack/portal-ui';
import { TranslateLoader } from '@ngx-translate/core';
import { LodgingReservationsRoutingModule } from './lodging-reservations-routing.module';
import { lodgingReservationsComponents } from './components/lodgings-reservations-components';
import { LodgingsModule } from '../lodgings/lodgings.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    LodgingReservationsRoutingModule,
    NgLodgingReservationsModule,
    NgIdentitiesModule,
    DynamicFieldsModule,
    LodgingsModule // TODO: Does this bundle the lodgings module along with reservation, or trigger a load of the bundled lazy loaded version?
  ],
  declarations: [
    ...lodgingReservationsComponents,
  ],
  providers: [
    LanguageService,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class LodgingReservationsModule {
  constructor(public languageService: LanguageService) { }
}
