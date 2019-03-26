import { Component, OnInit } from '@angular/core';
import { ProductsSalesPriceAppState, ProductsSalesPrice } from '@skysmack/packages-products-pricings';
import { NgProductsSalesPriceActions, NgProductsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductsSalesPriceStore } from '@skysmack/ng-packages';
import { NgProductsSalesPriceFieldsConfig } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedQuery } from '@skysmack/framework';
import { NgProductsStore } from '@skysmack/ng-packages';
import { NgProductsSalesPriceFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-products-sales-price-create',
  templateUrl: './products-sales-price-create.component.html',
  styleUrls: ['./products-sales-price-create.component.scss']
})
export class ProductsSalesPriceCreateComponent extends RecordFormComponent<ProductsSalesPriceAppState, ProductsSalesPrice, number, NgProductsSalesPriceFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductsSalesPriceActions,
    public productsActions: NgProductsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductsSalesPriceFieldsConfig,
    public store: NgProductsSalesPriceStore,
    public productsStore: NgProductsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.productsActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.productsStore.get(this.packagePath),
      this.skysmackStore.getEditorItem(),
    ).pipe(
      map(values => {
        const availableProducts = values[0];
        this.editorItem = values[1];

        return this.fieldsConfig.getFields(this.editorItem, undefined, { availableProducts });
      })
    );
  }
}
