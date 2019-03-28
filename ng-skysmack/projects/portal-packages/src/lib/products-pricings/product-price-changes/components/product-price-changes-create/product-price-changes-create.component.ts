import { Component, OnInit } from '@angular/core';
import { ProductPriceChangesAppState, ProductPriceChanges } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesActions, NgProductsSalesPriceActions, NgProductsSalesPriceStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductPriceChangesStore } from '@skysmack/ng-packages';
import { NgProductPriceChangesFieldsConfig } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PagedQuery } from '@skysmack/framework';
import { NgProductPriceChangesFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-product-price-changes-create',
  templateUrl: './product-price-changes-create.component.html',
  styleUrls: ['./product-price-changes-create.component.scss']
})
export class ProductPriceChangesCreateComponent extends RecordFormComponent<ProductPriceChangesAppState, ProductPriceChanges, number, NgProductPriceChangesFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductPriceChangesActions,
    public productsSalesPriceActions: NgProductsSalesPriceActions,
    public productsSalesPriceStore: NgProductsSalesPriceStore,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductPriceChangesFieldsConfig,
    public store: NgProductPriceChangesStore,
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
          this.productsSalesPriceActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
          requested = true;
        }
        return combineLatest(
          this.productsSalesPriceStore.get(loadedPackage._package.dependencies[0]),
          this.skysmackStore.getEditorItem()
        );
      }),
      map(values => {
        const availableProductsSalesPrices = values[0];
        this.editorItem = values[1];

        return this.fieldsConfig.getFields(this.editorItem, undefined, { availableProductsSalesPrices });
      })
    );
  }
}
