import { Component, OnInit } from '@angular/core';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgProductsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgProductsFieldsConfig, NgProductFormDependencies } from '@skysmack/ng-packages';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgProductsStore } from '@skysmack/ng-packages';
import { NgProductTypesActions } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgProductTypesStore } from '@skysmack/ng-packages';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';

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
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductsFieldsConfig,
    public store: NgProductsStore,
    public productTypeStore: NgProductTypesStore,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldReduxStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  public setEditFields() {
    this.productTypeActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.initEditDocRecord(),
      this.productTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const entity = values[0][0];
        const dynamicFields = values[0][1];
        const availableProductTypes = values[1];
        this.selectedEntity = entity;
        return this.fieldsConfig.getFields(entity, dynamicFields, { availableProductTypes });
      })
    );
  }
}
