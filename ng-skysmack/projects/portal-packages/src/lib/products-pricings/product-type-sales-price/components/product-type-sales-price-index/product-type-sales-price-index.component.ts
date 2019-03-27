import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductTypeSalesPriceActions, NgProductTypeSalesPriceFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgProductTypeSalesPriceStore } from '@skysmack/ng-packages';
import { ProductTypeSalesPriceAppState, PRODUCT_TYPE_SALES_PRICE_AREA_KEY, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductTypeSalesPriceMenu } from '../../ng-product-type-sales-price-menu';
import { EntityAction } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-product-type-sales-price-index',
  templateUrl: './product-type-sales-price-index.component.html',
  styleUrls: ['./product-type-sales-price-index.component.scss']
})
export class ProductTypeSalesPriceIndexComponent extends RecordIndexComponent<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> implements OnInit {

  public area: string = PRODUCT_TYPE_SALES_PRICE_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductTypeSalesPriceActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgProductTypeSalesPriceStore,
    public sidebarMenu: NgProductTypeSalesPriceMenu,
    public fieldsConfig: NgProductTypeSalesPriceFieldsConfig,
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
