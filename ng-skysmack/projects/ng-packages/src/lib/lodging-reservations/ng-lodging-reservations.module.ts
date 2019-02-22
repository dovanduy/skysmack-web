import { NgModule } from '@angular/core';
import { ReducerRegistry } from '@skysmack/redux';
import { lodgingReservationsReducer } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsEpics } from './redux/ng-lodging-reservations-epics';
import { registerEpics, NgMenuItemProviders } from '@skysmack/ng-redux';
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
    ReducerRegistry.Instance.register('lodgingReservations', lodgingReservationsReducer);
    registerEpics(lodgingReservationsEpics);
    ngMenuItemProviders.providers.push(menuItemProvider);
  }
}
