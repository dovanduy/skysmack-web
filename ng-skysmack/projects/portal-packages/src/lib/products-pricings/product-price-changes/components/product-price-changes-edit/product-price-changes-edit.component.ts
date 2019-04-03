import { Component, OnInit } from '@angular/core';
import { ProductPriceChangesAppState, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesActions, NgProductsSalesPriceActions, NgProductsSalesPriceStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductPriceChangesFieldsConfig } from '@skysmack/ng-packages';
import { NgProductPriceChangesStore } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgProductPriceChangesFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-product-price-changes-edit',
  templateUrl: './product-price-changes-edit.component.html'
})
export class ProductPriceChangesEditComponent extends RecordFormComponent<ProductPriceChangesAppState, ProductPriceChange, number, NgProductPriceChangesFormDependencies> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductPriceChangesActions,
    public productsSalesPriceActions: NgProductsSalesPriceActions,
    public productsSalesPriceStore: NgProductsSalesPriceStore,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductPriceChangesFieldsConfig,
    public store: NgProductPriceChangesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  public setEditFields() {
    this.productsSalesPriceActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.initEditRecord(),
      this.productsSalesPriceStore.get(this.packagePath),
      this.skysmackStore.getEditorItem()
    ).pipe(
      map(values => {
        const entity = values[0];
        const availableProductsSalesPrices = values[1];
        this.editorItem = values[2] as LocalObject<ProductPriceChange, number>;
        this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;
        return this.fieldsConfig.getFields(this.selectedEntity, undefined, { availableProductsSalesPrices });
      })
    );
  }
}
