import { Component, OnInit } from '@angular/core';
import { ProductTypeSalesPriceAppState, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductTypeSalesPriceActions, NgProductTypesActions, NgProductTypesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductTypeSalesPriceStore } from '@skysmack/ng-packages';
import { map, take } from 'rxjs/operators';
import { PagedQuery, defined } from '@skysmack/framework';
import { NgProductTypeSalesPriceFieldsConfig } from '../../ng-product-type-sales-price-fields-config';
import { LoadedPackage } from '@skysmack/ng-redux';

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
