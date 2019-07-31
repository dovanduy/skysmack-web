import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_TYPE_RESERVATION_PRICE_CHANGES_AREA_KEY, LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { MenuItem } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgLodgingTypeReservationPriceChangesActions, NgLodgingTypeReservationPriceChangesStore } from '@skysmack/ng-reservations-pricings';
import { NgLodgingTypeReservationPriceChangesMenu } from '../../ng-lodging-type-reservation-price-changes-menu';
import { NgLodgingTypeReservationPriceChangesFieldsConfig } from '../../ng-lodging-type-reservation-price-changes-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodging-type-reservation-price-changes-index',
  templateUrl: './lodging-type-reservation-price-changes-index.component.html'
})
export class LodgingTypeReservationPriceChangesIndexComponent extends RecordIndexComponent<LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange, number> implements OnInit {

  public areaKey: string = LODGING_TYPE_RESERVATION_PRICE_CHANGES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypeReservationPriceChangesActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingTypeReservationPriceChangesStore,
    public sidebarMenu: NgLodgingTypeReservationPriceChangesMenu,
    public fieldsConfig: NgLodgingTypeReservationPriceChangesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
