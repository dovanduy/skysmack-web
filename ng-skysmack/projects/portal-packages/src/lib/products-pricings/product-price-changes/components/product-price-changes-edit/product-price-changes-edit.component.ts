import { Component, OnInit } from '@angular/core';
import { ProductPriceChangesAppState, ProductPriceChanges } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesActions, NgProductsActions, NgProductsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductPriceChangesFieldsConfig } from '@skysmack/ng-packages';
import { NgProductPriceChangesStore } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { map, switchMap } from 'rxjs/operators';
import { NgProductPriceChangesFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-product-price-changes-edit',
  templateUrl: './product-price-changes-edit.component.html',
  styleUrls: ['./product-price-changes-edit.component.scss']
})
export class ProductPriceChangesEditComponent extends RecordFormComponent<ProductPriceChangesAppState, ProductPriceChanges, number, NgProductPriceChangesFormDependencies> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductPriceChangesActions,
    public productsActions: NgProductsActions,
    public productsStore: NgProductsStore,
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
        this.editorItem = values[2] as LocalObject<ProductPriceChanges, number>;
        this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;
        return this.fieldsConfig.getFields(this.selectedEntity, undefined, { availableProducts });
      })
    );
  }
}
