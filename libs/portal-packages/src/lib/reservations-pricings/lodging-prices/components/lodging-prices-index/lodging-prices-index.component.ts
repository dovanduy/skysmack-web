import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_PRICES_AREA_KEY, LodgingPricesAppState, LodgingPrice } from '@skysmack/packages-reservations-pricings';
import { MenuItem } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgLodgingPricesActions, NgLodgingPricesStore } from '@skysmack/ng-reservations-pricings';
import { NgLodgingPricesFieldsConfig } from '../../ng-lodging-prices-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodging-prices-index',
  templateUrl: './lodging-prices-index.component.html'
})
export class LodgingPricesIndexComponent extends RecordIndexComponent<LodgingPricesAppState, LodgingPrice, number> implements OnInit {
  public static COMPONENT_KEY = 'lodging-prices-index';
  public componentKey = LodgingPricesIndexComponent.COMPONENT_KEY;

  public areaKey: string = LODGING_PRICES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingPricesActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingPricesStore,
    public fieldsConfig: NgLodgingPricesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
