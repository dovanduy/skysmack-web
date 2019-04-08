import { Component, OnInit } from '@angular/core';
import { ProductTypeSalesPriceAppState, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductTypeSalesPriceActions, NgProductTypesActions, LoadedPackage } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductTypeSalesPriceStore } from '@skysmack/ng-packages';
import { PagedQuery, defined } from '@skysmack/framework';
import { map, take } from 'rxjs/operators';
import { NgProductTypeSalesPriceFieldsConfig } from '../../ng-product-type-sales-price-fields-config';

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
    this.getDeps();
    this.setEditFields();
  }

  public getDeps() {
    this.loadedPackage$.pipe(
      defined(),
      map((loadedPackage: LoadedPackage) => this.productTypesActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery())),
      take(1)
    ).subscribe();
  }
}
