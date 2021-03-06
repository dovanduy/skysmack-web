import { Component, OnInit } from '@angular/core';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgProductsActions, NgProductTypesActions, NgProductsStore, NgProductTypesStore } from '@skysmack/ng-products';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgProductsFieldsConfig } from '../../ng-products-fields-config';

@Component({
  selector: 'ss-products-edit',
  templateUrl: './products-edit.component.html'
})
export class ProductsEditComponent extends DocumentRecordFormComponent<ProductsAppState, Product, number> implements OnInit {
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
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
