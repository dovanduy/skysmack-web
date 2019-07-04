import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_RESERVATION_PRICE_CHANGES_AREA_KEY, LodgingReservationPriceChangesAppState, LodgingReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { MenuItem } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingReservationPriceChangesActions, NgLodgingReservationPriceChangesStore } from '@skysmack/ng-packages';
import { NgLodgingReservationPriceChangesMenu } from '../../ng-lodging-reservation-price-changes-menu';
import { NgLodgingReservationPriceChangesFieldsConfig } from '../../ng-lodging-reservation-price-changes-fields-config';

@Component({
  selector: 'ss-lodging-reservation-price-changes-index',
  templateUrl: './lodging-reservation-price-changes-index.component.html'
})
export class LodgingReservationPriceChangesIndexComponent extends RecordIndexComponent<LodgingReservationPriceChangesAppState, LodgingReservationPriceChange, number> implements OnInit {

  public areaKey: string = LODGING_RESERVATION_PRICE_CHANGES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingReservationPriceChangesActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingReservationPriceChangesStore,
    public sidebarMenu: NgLodgingReservationPriceChangesMenu,
    public fieldsConfig: NgLodgingReservationPriceChangesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
