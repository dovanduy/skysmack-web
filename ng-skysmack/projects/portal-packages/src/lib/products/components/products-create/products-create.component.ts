import { Component, OnInit } from '@angular/core';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgProductsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgProductsStore } from '@skysmack/ng-packages';
import { NgProductsFieldsConfig, NgProductFormDependencies } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedQuery } from '@skysmack/framework';
import { NgProductTypesActions } from '@skysmack/ng-packages';
import { NgProductTypesStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss']
})
export class ProductsCreateComponent extends DocumentRecordFormComponent<ProductsAppState, Product, number, NgProductFormDependencies> implements OnInit {

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
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.productTypeActions.getPaged(this.packagePath, new PagedQuery());

    this.subscriptionHandler.register(combineLatest(
      this.initCreateDocRecord(),
      this.productTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const dynamicFields = values[0];
        const availableProductTypes = values[1];
        return this.fieldsConfig.getFields(undefined, dynamicFields, { availableProductTypes });
      })
    ).subscribe(fields => this.fields = fields));
  }
}
