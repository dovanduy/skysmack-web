import { Component, OnInit } from '@angular/core';
import { ProductsSalesPriceAppState, ProductsSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductsSalesPriceActions, NgProductsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductsSalesPriceStore } from '@skysmack/ng-packages';
import { NgProductsStore } from '@skysmack/ng-packages';
import { NgProductsSalesPriceFieldsConfig } from '../../ng-products-sales-price-fields-config';

@Component({
  selector: 'ss-products-sales-price-create',
  templateUrl: './products-sales-price-create.component.html'
})
export class ProductsSalesPriceCreateComponent extends RecordFormComponent<ProductsSalesPriceAppState, ProductsSalesPrice, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductsSalesPriceActions,
    public productsActions: NgProductsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductsSalesPriceFieldsConfig,
    public store: NgProductsSalesPriceStore,
    public productsStore: NgProductsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}