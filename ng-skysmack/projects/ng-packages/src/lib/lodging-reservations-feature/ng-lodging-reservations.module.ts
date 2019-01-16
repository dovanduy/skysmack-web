import { NgModule } from '@angular/core';
import { ReducerRegistry } from '@skysmack/redux';
import { lodgingReservationsReducer } from '@skysmack/packages-lodging-reservations-feature';
import { NgLodgingReservationsEpics } from './redux/ng-lodging-reservations-epics';
import { registerEpics } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgLodgingReservationsModule {
  constructor(
    lodgingReservationsEpics: NgLodgingReservationsEpics
  ) {
    ReducerRegistry.Instance.register('lodgingReservations', lodgingReservationsReducer);
    registerEpics(lodgingReservationsEpics);
  }
}
