import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductPriceChangesActions, NgProductPriceChangesStore } from '@skysmack/ng-products-pricings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ProductPriceChangesAppState, PRODUCT_PRICE_CHANGES_AREA_KEY, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { MenuItem } from '@skysmack/framework';
import { NgProductPriceChangesFieldsConfig } from '../../ng-product-price-changes-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-price-changes-index',
  templateUrl: './product-price-changes-index.component.html'
})
export class ProductPriceChangesIndexComponent extends RecordIndexComponent<ProductPriceChangesAppState, ProductPriceChange, number> implements OnInit {
  public static COMPONENT_KEY = 'product-price-changes-index';
  public componentKey = ProductPriceChangesIndexComponent.COMPONENT_KEY;

  public areaKey: string = PRODUCT_PRICE_CHANGES_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductPriceChangesActions,
    public redux: NgSkysmackStore,
    public store: NgProductPriceChangesStore,
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
