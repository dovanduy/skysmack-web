import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductsSalesPriceActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgProductsSalesPriceStore } from '@skysmack/ng-packages';
import { ProductsSalesPriceAppState, PRODUCTS_SALES_PRICE_AREA_KEY, ProductsSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductsSalesPriceMenu } from '../../ng-products-sales-price-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgProductsSalesPriceFieldsConfig } from '../../ng-products-sales-price-fields-config';

@Component({
  selector: 'ss-products-sales-price-index',
  templateUrl: './products-sales-price-index.component.html'
})
export class ProductsSalesPriceIndexComponent extends RecordIndexComponent<ProductsSalesPriceAppState, ProductsSalesPrice, number> implements OnInit {

  public areaKey: string = PRODUCTS_SALES_PRICE_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductsSalesPriceActions,
    public redux: NgSkysmackStore,
    public store: NgProductsSalesPriceStore,
    public sidebarMenu: NgProductsSalesPriceMenu,
    public fieldsConfig: NgProductsSalesPriceFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
