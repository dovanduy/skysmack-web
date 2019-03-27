import { Component, OnInit } from '@angular/core';
import { ProductTypeSalesPriceAppState, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductTypeSalesPriceActions, NgProductTypesActions, NgProductTypesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductTypeSalesPriceStore } from '@skysmack/ng-packages';
import { NgProductTypeSalesPriceFieldsConfig } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PagedQuery } from '@skysmack/framework';
import { NgProductTypeSalesPriceFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-product-type-sales-price-create',
  templateUrl: './product-type-sales-price-create.component.html',
  styleUrls: ['./product-type-sales-price-create.component.scss']
})
export class ProductTypeSalesPriceCreateComponent extends RecordFormComponent<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number, NgProductTypeSalesPriceFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypeSalesPriceActions,
    public productTypesActions: NgProductTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypeSalesPriceFieldsConfig,
    public store: NgProductTypeSalesPriceStore,
    public productTypesStore: NgProductTypesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    // TODO: Find better way to prevent multiple requests getting fired...
    let requested = false;

    this.fields$ = this.loadedPackage$.pipe(
      switchMap(loadedPackage => {
        if (!requested) {
          this.productTypesActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
          requested = true;
        }
        return combineLatest(
          this.productTypesStore.get(loadedPackage._package.dependencies[0]),
          this.skysmackStore.getEditorItem()
        );
      }),
      map(values => {
        const availableProductTypes = values[0];
        this.editorItem = values[1];

        return this.fieldsConfig.getFields(this.editorItem, undefined, { availableProductTypes });
      })
    );
  }
}
