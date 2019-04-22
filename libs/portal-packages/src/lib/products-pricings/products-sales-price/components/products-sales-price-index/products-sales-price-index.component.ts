import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
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

  public area: string = PRODUCTS_SALES_PRICE_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductsSalesPriceActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgProductsSalesPriceStore,
    public sidebarMenu: NgProductsSalesPriceMenu,
    public fieldsConfig: NgProductsSalesPriceFieldsConfig,
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
