import { Component, OnInit } from '@angular/core';
import { ProductsSalesPriceAppState, ProductsSalesPrice } from '@skysmack/packages-products-pricings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgProductsSalesPriceStore, NgProductsSalesPriceActions } from '@skysmack/ng-products-pricings';
import { NgProductsStore, NgProductsActions } from '@skysmack/ng-products';
import { NgProductsSalesPriceFieldsConfig } from '../../ng-products-sales-price-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

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
