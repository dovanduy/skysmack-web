import { NgModule } from '@angular/core';
import { NgPersonsLodgingReservationsFieldProvider } from './ng-persons-lodgings-reservations-field-provider';
import { FieldProviders } from '@skysmack/ng-ui';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgPersonsLodgingReservationsModule {
  constructor(
    fieldProviders: FieldProviders,
    personsLodgingsReservationsFieldProvider: NgPersonsLodgingReservationsFieldProvider
  ) {
    fieldProviders.add(personsLodgingsReservationsFieldProvider);
  }
}
