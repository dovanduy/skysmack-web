import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgProductTypeSalesPriceStore, NgProductTypeSalesPriceActions } from '@skysmack/ng-products-pricings';
import { ProductTypeSalesPriceAppState, PRODUCT_TYPE_SALES_PRICE_AREA_KEY, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { MenuItem } from '@skysmack/framework';
import { NgProductTypeSalesPriceFieldsConfig } from '../../ng-product-type-sales-price-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-type-sales-price-index',
  templateUrl: './product-type-sales-price-index.component.html'
})
export class ProductTypeSalesPriceIndexComponent extends RecordIndexComponent<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> implements OnInit {
  public static COMPONENT_KEY = 'product-type-sales-price-index';
  public componentKey = ProductTypeSalesPriceIndexComponent.COMPONENT_KEY;

  public areaKey: string = PRODUCT_TYPE_SALES_PRICE_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductTypeSalesPriceActions,
    public redux: NgSkysmackStore,
    public store: NgProductTypeSalesPriceStore,
    public fieldsConfig: NgProductTypeSalesPriceFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
