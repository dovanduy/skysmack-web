import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PortalUiModule } from '@skysmack/portal-ui';
import { NgPersonsLodgingReservationsModule } from '@skysmack/ng-persons-lodging-reservations';
import { PersonsLodgingReservationsRoutingModule } from './persons-lodging-reservations-routing.module';
import { NgPersonsLodgingReservationsFieldProvider } from './ng-persons-lodgings-reservations-field-provider';
import { LodgingReservationsTypeId } from '@skysmack/package-types';
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
  providers: []
})
export class PersonsLodgingReservationsModule {
  constructor(
    fieldProviders: FieldProviders,
    personsLodgingsReservationsFieldProvider: NgPersonsLodgingReservationsFieldProvider,
  ) {
    fieldProviders.add(LodgingReservationsTypeId, personsLodgingsReservationsFieldProvider);
  }
}
