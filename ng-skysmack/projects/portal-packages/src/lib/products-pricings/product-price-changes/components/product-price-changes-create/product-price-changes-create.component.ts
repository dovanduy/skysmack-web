import { Component, OnInit } from '@angular/core';
import { ProductPriceChangesAppState, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesActions, NgProductsSalesPriceActions, NgProductsSalesPriceStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductPriceChangesStore } from '@skysmack/ng-packages';
import { NgProductPriceChangesFieldsConfig } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedQuery } from '@skysmack/framework';
import { NgProductPriceChangesFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-product-price-changes-create',
  templateUrl: './product-price-changes-create.component.html'
})
export class ProductPriceChangesCreateComponent extends RecordFormComponent<ProductPriceChangesAppState, ProductPriceChange, number, NgProductPriceChangesFormDependencies> implements OnInit {

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
    this.productsSalesPriceActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.productsSalesPriceStore.get(this.packagePath),
      this.skysmackStore.getEditorItem()
    ).pipe(
      map(values => {
        const availableProductsSalesPrices = values[0];
        this.editorItem = values[1];

        return this.fieldsConfig.getFields(this.editorItem, undefined, { availableProductsSalesPrices });
      })
    );
  }
}
