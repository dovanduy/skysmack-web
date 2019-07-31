import { Component, OnInit } from '@angular/core';
import { ProductTypeSalesPriceAppState, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductTypesActions } from '@skysmack/ng-products';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgProductTypeSalesPriceStore, NgProductTypeSalesPriceActions } from '@skysmack/ng-products-pricings';
import { NgProductTypeSalesPriceFieldsConfig } from '../../ng-product-type-sales-price-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-type-sales-price-edit',
  templateUrl: './product-type-sales-price-edit.component.html'
})
export class ProductTypeSalesPriceEditComponent extends RecordFormComponent<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypeSalesPriceActions,
    public productTypesActions: NgProductTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypeSalesPriceFieldsConfig,
    public store: NgProductTypeSalesPriceStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
