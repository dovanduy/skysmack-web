import { Component, OnInit } from '@angular/core';
import { ProductTypeSalesPriceAppState, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductTypesActions, NgProductTypesStore } from '@skysmack/ng-products';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgProductTypeSalesPriceStore, NgProductTypeSalesPriceActions } from '@skysmack/ng-products-pricings';
import { NgProductTypeSalesPriceFieldsConfig } from '../../ng-product-type-sales-price-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-type-sales-price-create',
  templateUrl: './product-type-sales-price-create.component.html'
})
export class ProductTypeSalesPriceCreateComponent extends RecordFormComponent<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypeSalesPriceActions,
    public productTypesActions: NgProductTypesActions,
    public productTypesStore: NgProductTypesStore,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypeSalesPriceFieldsConfig,
    public store: NgProductTypeSalesPriceStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
