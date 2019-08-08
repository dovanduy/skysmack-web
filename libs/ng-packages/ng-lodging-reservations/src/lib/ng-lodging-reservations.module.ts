import { NgModule } from '@angular/core';
import { lodgingReservationsReducer, LODGING_RESERVATIONS_REDUCER_KEY } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsEpics } from './lodging-reservations/redux/ng-lodging-reservations-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgLodgingReservationsModule {
  constructor(
    lodgingReservationsEpics: NgLodgingReservationsEpics
  ) {
    registerRedux(LODGING_RESERVATIONS_REDUCER_KEY, lodgingReservationsReducer, lodgingReservationsEpics);
  }
}
