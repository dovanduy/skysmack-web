import { Component, OnInit } from '@angular/core';
import { ProductTypeSalesPriceAppState, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductTypeSalesPriceActions, NgProductsActions, NgProductsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductTypeSalesPriceFieldsConfig } from '@skysmack/ng-packages';
import { NgProductTypeSalesPriceStore } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { map, switchMap } from 'rxjs/operators';
import { NgProductTypeSalesPriceFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-product-type-sales-price-edit',
  templateUrl: './product-type-sales-price-edit.component.html',
  styleUrls: ['./product-type-sales-price-edit.component.scss']
})
export class ProductTypeSalesPriceEditComponent extends RecordFormComponent<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number, NgProductTypeSalesPriceFormDependencies> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypeSalesPriceActions,
    public productsActions: NgProductsActions,
    public productsStore: NgProductsStore,
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

  public setEditFields() {
    // TODO: Find better way to prevent multiple requests getting fired...
    let requested = false;

    this.fields$ = this.loadedPackage$.pipe(
      switchMap(loadedPackage => {
        if (!requested) {
          this.productsActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
          requested = true;
        }
        return combineLatest(
          this.initEditRecord(),
          this.productsStore.get(loadedPackage._package.dependencies[0]),
          this.skysmackStore.getEditorItem()
        );
      }),
      map(values => {
        const entity = values[0];
        const availableProducts = values[1];
        this.editorItem = values[2] as LocalObject<ProductTypeSalesPrice, number>;
        this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;
        return this.fieldsConfig.getFields(this.selectedEntity, undefined, { availableProducts });
      })
    );
  }
}
