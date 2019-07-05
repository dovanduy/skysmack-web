import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { NgPersonsLodgingReservationsModule } from '@skysmack/ng-packages';
import { PersonsLodgingReservationsRoutingModule } from './persons-lodging-reservations-routing.module';
import { FieldProviders } from '@skysmack/portal-ui';
import { NgPersonsLodgingReservationsFieldProvider } from './ng-persons-lodgings-reservations-field-provider';
import { LodgingReservationsType } from '@skysmack/packages-lodging-reservations';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    PersonsLodgingReservationsRoutingModule,
    NgPersonsLodgingReservationsModule,
    FieldsModule
  ],
  declarations: [
  ],
  providers: [
    LanguageService
  ]
})
export class PersonsLodgingReservationsModule {
  constructor(
    fieldProviders: FieldProviders,
    personsLodgingsReservationsFieldProvider: NgPersonsLodgingReservationsFieldProvider,
  ) {
    fieldProviders.add(LodgingReservationsType.id, personsLodgingsReservationsFieldProvider);
  }
}
