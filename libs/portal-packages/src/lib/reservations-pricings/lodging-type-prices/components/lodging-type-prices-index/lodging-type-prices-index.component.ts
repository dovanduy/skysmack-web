import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_TYPE_PRICES_AREA_KEY, LodgingTypePricesAppState, LodgingTypePrice } from '@skysmack/packages-reservations-pricings';
import { MenuItem } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgLodgingTypePricesActions, NgLodgingTypePricesStore } from '@skysmack/ng-reservations-pricings';
import { NgLodgingTypePricesMenu } from '../../ng-lodging-type-prices-menu';
import { NgLodgingTypePricesFieldsConfig } from '../../ng-lodging-type-prices-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodging-type-prices-index',
  templateUrl: './lodging-type-prices-index.component.html'
})
export class LodgingTypePricesIndexComponent extends RecordIndexComponent<LodgingTypePricesAppState, LodgingTypePrice, number> implements OnInit {
  public static COMPONENT_KEY = 'lodging-type-prices-index';
  public componentKey = LodgingTypePricesIndexComponent.COMPONENT_KEY;

  public areaKey: string = LODGING_TYPE_PRICES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypePricesActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingTypePricesStore,
    public sidebarMenu: NgLodgingTypePricesMenu,
    public fieldsConfig: NgLodgingTypePricesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
