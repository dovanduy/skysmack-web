import { NgModule } from '@angular/core';
import { lodgingReservationsReducer, LODGING_RESERVATIONS_REDUCER_KEY, groupReservationsReducer } from '@skysmack/packages-lodging-reservations';
import { registerRedux } from '@skysmack/ng-framework';
import { NgLodgingReservationsEpics } from './lodging-reservations/redux/ng-lodging-reservations-epics';
import { NgGroupReservationsEpics } from './group-reservations/redux/ng-group-reservations-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgLodgingReservationsModule {
  constructor(
    lodgingReservationsEpics: NgLodgingReservationsEpics,
    groupReservationsEpics: NgGroupReservationsEpics,
  ) {
    registerRedux(LODGING_RESERVATIONS_REDUCER_KEY, lodgingReservationsReducer, lodgingReservationsEpics);
    registerRedux(LODGING_RESERVATIONS_REDUCER_KEY, groupReservationsReducer, groupReservationsEpics);
  }
}
