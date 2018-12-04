import { Component, OnInit } from '@angular/core';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgProductsActions } from 'lib/ng-packages/products/redux/ng-products-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { NgProductsFieldsConfig, NgProductFormDependencies } from 'lib/ng-packages/products/ng-products-fields-config';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { NgProductsStore } from 'lib/ng-packages/products';
import { NgProductTypesActions } from 'lib/ng-packages/products/redux/ng-product-types-actions';
import { combineLatest } from 'rxjs';
import { PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgProductTypesStore } from 'lib/ng-packages/products/redux/ng-product-types-store';

@Component({
  selector: 'ss-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent extends DocumentRecordFormComponent<ProductsAppState, Product, number, NgProductFormDependencies> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductsActions,
    public productTypeActions: NgProductTypesActions,
    public redux: NgSkysmackRedux,
    public fieldsConfig: NgProductsFieldsConfig,
    public store: NgProductsStore,
    public productTypeStore: NgProductTypesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  public setEditFields() {
    this.productTypeActions.getPaged(this.packagePath, new PagedQuery());

    this.subscriptionHandler.subscribe(combineLatest(
      this.initEditDocRecord(),
      this.productTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const entity = values[0][0];
        const dynamicFields = values[0][1];
        const availableProductTypes = values[1];
        return this.getFields(entity, dynamicFields, { availableProductTypes });
      })
    ).subscribe(fields => this.fields = fields));
  }
}
