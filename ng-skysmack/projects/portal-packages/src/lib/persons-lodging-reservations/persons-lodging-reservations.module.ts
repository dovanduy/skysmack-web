import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { PortalUiModule, HttpLoaderFactory, FieldsModule } from '@skysmack/portal-ui';
import { TranslateLoader } from '@ngx-translate/core';
import { NgPersonsLodgingReservationsModule } from '@skysmack/ng-packages';
import { PersonsLodgingReservationsRoutingModule } from './persons-lodging-reservations-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    PersonsLodgingReservationsRoutingModule,
    NgPersonsLodgingReservationsModule,
    FieldsModule
  ],
  declarations: [
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
export class PersonsLodgingReservationsModule {
  constructor(public languageService: LanguageService) { }
}
