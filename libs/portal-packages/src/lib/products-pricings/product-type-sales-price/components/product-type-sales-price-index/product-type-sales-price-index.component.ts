import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductTypeSalesPriceActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgProductTypeSalesPriceStore } from '@skysmack/ng-packages';
import { ProductTypeSalesPriceAppState, PRODUCT_TYPE_SALES_PRICE_AREA_KEY, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductTypeSalesPriceMenu } from '../../ng-product-type-sales-price-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgProductTypeSalesPriceFieldsConfig } from '../../ng-product-type-sales-price-fields-config';

@Component({
  selector: 'ss-product-type-sales-price-index',
  templateUrl: './product-type-sales-price-index.component.html'
})
export class ProductTypeSalesPriceIndexComponent extends RecordIndexComponent<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> implements OnInit {

  public areaKey: string = PRODUCT_TYPE_SALES_PRICE_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductTypeSalesPriceActions,
    public redux: NgSkysmackStore,
    public store: NgProductTypeSalesPriceStore,
    public sidebarMenu: NgProductTypeSalesPriceMenu,
    public fieldsConfig: NgProductTypeSalesPriceFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
