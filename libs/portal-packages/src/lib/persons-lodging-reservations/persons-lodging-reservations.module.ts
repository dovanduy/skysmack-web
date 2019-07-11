import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { PortalUiModule } from '@skysmack/portal-ui';
import { NgPersonsLodgingReservationsModule } from '@skysmack/ng-packages';
import { PersonsLodgingReservationsRoutingModule } from './persons-lodging-reservations-routing.module';
import { NgPersonsLodgingReservationsFieldProvider } from './ng-persons-lodgings-reservations-field-provider';
import { LodgingReservationsType } from '@skysmack/package-types';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    PersonsLodgingReservationsRoutingModule,
    NgPersonsLodgingReservationsModule,
    PortalFieldsModule
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
