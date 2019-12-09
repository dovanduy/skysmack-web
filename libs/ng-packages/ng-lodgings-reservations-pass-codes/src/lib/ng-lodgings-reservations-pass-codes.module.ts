import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { LODGINGS_RESERVATIONS_PASS_CODES_REDUCER_KEY } from './lodgings-reservations-pass-codes/constants/constants';
import { NgLodgingsReservationsPassCodesEpics } from './lodgings-reservations-pass-codes/redux/ng-lodgings-reservations-pass-codes-epics';
import { lodgingsReservationsPassCodesReducer } from './lodgings-reservations-pass-codes/redux/lodgings-reservations-pass-codes-reducer';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgLodgingsReservationsPassCodesModule {
  constructor(
    epics: NgLodgingsReservationsPassCodesEpics,
  ) {
    registerRedux(LODGINGS_RESERVATIONS_PASS_CODES_REDUCER_KEY, lodgingsReservationsPassCodesReducer, epics);
  }
}

