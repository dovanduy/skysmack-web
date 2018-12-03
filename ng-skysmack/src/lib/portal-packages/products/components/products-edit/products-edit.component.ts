import { Component, OnInit } from '@angular/core';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgProductsActions } from 'lib/ng-packages/products/redux/ng-products-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { NgProductsFieldsConfig } from 'lib/ng-packages/products/ng-products-fields-config';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { NgProductsStore } from 'lib/ng-packages/products';

@Component({
  selector: 'ss-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent extends DocumentRecordFormComponent<ProductsAppState, Product, number> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductsActions,
    public redux: NgSkysmackRedux,
    public fieldsConfig: NgProductsFieldsConfig,
    public store: NgProductsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initDocumentRecordEditComponent();

    // // CUSTOM
    // this.actions.getSingle(this.packagePath, this.entityId); // <-- Get types
    // this.productTypes$ = this.store.getWhatever(this.packagePath, this.entityId); // <-- product types
  }

  // CUSTOM
  // public override setFields() {

  // }
}
