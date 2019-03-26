import { NgModule } from '@angular/core';
import { NgMenuItemProviders } from '@skysmack/ng-redux';
import { NgProductsPricingsMenuItemProvider } from './ng-products-pricings-menu-item-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgProductsPricingsModule {
  constructor(
    // lodgingReservationsEpics: NgLodgingReservationsEpics,
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgProductsPricingsMenuItemProvider
  ) {
    // registerRedux('lodgingReservations', lodgingReservationsReducer, lodgingReservationsEpics);
    ngMenuItemProviders.providers.push(menuItemProvider);
  }
}
