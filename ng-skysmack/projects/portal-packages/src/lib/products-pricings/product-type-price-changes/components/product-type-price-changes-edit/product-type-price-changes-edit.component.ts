import { Component, OnInit } from '@angular/core';
import { ProductTypePriceChangesAppState, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductTypePriceChangesActions, NgProductTypesActions, LoadedPackage } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductTypePriceChangesStore } from '@skysmack/ng-packages';
import { PagedQuery, defined } from '@skysmack/framework';
import { NgProductTypePriceChangesFieldsConfig } from '../../ng-product-type-price-changes-fields-config';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'ss-product-type-price-changes-edit',
  templateUrl: './product-type-price-changes-edit.component.html'
})
export class ProductTypePriceChangesEditComponent extends RecordFormComponent<ProductTypePriceChangesAppState, ProductPriceChange, number> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypePriceChangesActions,
    public productTypesActions: NgProductTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypePriceChangesFieldsConfig,
    public store: NgProductTypePriceChangesStore
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
      map((loadedPackage: LoadedPackage) => {
        this.productTypesActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
      }),
      take(1)
    ).subscribe();
  }
}
