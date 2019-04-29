import { NgModule } from '@angular/core';
import { lodgingReservationsReducer } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsEpics } from './lodging-reservations/redux/ng-lodging-reservations-epics';
import { NgMenuItemProviders, registerRedux } from '@skysmack/ng-redux';
import { NgLodgingsReservationsMenuItemProvider } from './ng-lodgings-reservations-menu-item-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgLodgingReservationsModule {
  constructor(
    lodgingReservationsEpics: NgLodgingReservationsEpics,
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgLodgingsReservationsMenuItemProvider
  ) {
    registerRedux('lodgingReservations', lodgingReservationsReducer, lodgingReservationsEpics);
    ngMenuItemProviders.add(menuItemProvider);
  }
}
