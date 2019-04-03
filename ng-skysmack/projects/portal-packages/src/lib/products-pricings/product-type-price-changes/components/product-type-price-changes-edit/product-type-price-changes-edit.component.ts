import { Component, OnInit } from '@angular/core';
import { ProductTypePriceChangesAppState, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductTypePriceChangesActions, NgProductTypeSalesPriceActions, NgProductTypeSalesPriceStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductTypePriceChangesFieldsConfig } from '@skysmack/ng-packages';
import { NgProductTypePriceChangesStore } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgProductTypePriceChangesFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-product-type-price-changes-edit',
  templateUrl: './product-type-price-changes-edit.component.html'
})
export class ProductTypePriceChangesEditComponent extends RecordFormComponent<ProductTypePriceChangesAppState, ProductPriceChange, number, NgProductTypePriceChangesFormDependencies> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypePriceChangesActions,
    public productTypeSalesPriceActions: NgProductTypeSalesPriceActions,
    public productTypeSalesPriceStore: NgProductTypeSalesPriceStore,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypePriceChangesFieldsConfig,
    public store: NgProductTypePriceChangesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  public setEditFields() {
    this.productTypeSalesPriceActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.initEditRecord(),
      this.productTypeSalesPriceStore.get(this.packagePath),
      this.skysmackStore.getEditorItem()
    ).pipe(
      map(values => {
        const entity = values[0];
        const availableProductTypeSalesPrices = values[1];
        this.editorItem = values[2] as LocalObject<ProductPriceChange, number>;
        this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;
        return this.fieldsConfig.getFields(this.selectedEntity, undefined, { availableProductTypeSalesPrices });
      })
    );
  }
}
