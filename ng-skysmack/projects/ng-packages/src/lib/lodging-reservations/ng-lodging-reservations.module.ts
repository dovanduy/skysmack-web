import { NgModule } from '@angular/core';
import { ReducerRegistry } from '@skysmack/redux';
import { lodgingReservationsReducer } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsEpics } from './redux/ng-lodging-reservations-epics';
import { registerEpics } from '@skysmack/ng-redux';
import { MenuItemProvider } from '@skysmack/ng-ui';
import { NgLodgingsReservationsMenuItemProvider } from './ng-lodgings-reservations-menu-item-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    { provide: MenuItemProvider.TOKEN, useClass: NgLodgingsReservationsMenuItemProvider, multi: true }
  ],
})
export class NgLodgingReservationsModule {
  constructor(
    lodgingReservationsEpics: NgLodgingReservationsEpics
  ) {
    ReducerRegistry.Instance.register('lodgingReservations', lodgingReservationsReducer);
    registerEpics(lodgingReservationsEpics);
  }
}
