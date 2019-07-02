import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductPriceChangesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgProductPriceChangesStore } from '@skysmack/ng-packages';
import { ProductPriceChangesAppState, PRODUCT_PRICE_CHANGES_AREA_KEY, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesMenu } from '../../ng-product-price-changes-menu';
import { MenuItem } from '@skysmack/framework';
import { NgProductPriceChangesFieldsConfig } from '../../ng-product-price-changes-fields-config';

@Component({
  selector: 'ss-product-price-changes-index',
  templateUrl: './product-price-changes-index.component.html'
})
export class ProductPriceChangesIndexComponent extends RecordIndexComponent<ProductPriceChangesAppState, ProductPriceChange, number> implements OnInit {

  public areaKey: string = PRODUCT_PRICE_CHANGES_AREA_KEY;
  public entityActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductPriceChangesActions,
    public redux: NgSkysmackStore,
    public store: NgProductPriceChangesStore,
    public sidebarMenu: NgProductPriceChangesMenu,
    public fieldsConfig: NgProductPriceChangesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
