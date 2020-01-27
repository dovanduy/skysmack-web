import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductTypePriceChangesActions, NgProductTypePriceChangesStore } from '@skysmack/ng-products-pricings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ProductTypePriceChangesAppState, PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { MenuItem } from '@skysmack/framework';
import { NgProductTypePriceChangesFieldsConfig } from '../../ng-product-type-price-changes-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-type-price-changes-index',
  templateUrl: './product-type-price-changes-index.component.html'
})
export class ProductTypePriceChangesIndexComponent extends RecordIndexComponent<ProductTypePriceChangesAppState, ProductPriceChange, number> implements OnInit {
  public static COMPONENT_KEY = 'product-type-price-changes-index';
  public componentKey = ProductTypePriceChangesIndexComponent.COMPONENT_KEY;

  public areaKey: string = PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductTypePriceChangesActions,
    public redux: NgSkysmackStore,
    public store: NgProductTypePriceChangesStore,
    public fieldsConfig: NgProductTypePriceChangesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
