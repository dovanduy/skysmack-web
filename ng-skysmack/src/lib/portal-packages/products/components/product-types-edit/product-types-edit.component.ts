import { Component, OnInit } from '@angular/core';
import { Product, ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack/redux/ng-skysmack-store';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { NgProductTypesFieldsConfig, NgProductTypeFormDependencies } from 'lib/ng-packages/products/ng-product-types-fields-config';
import { NgProductTypesActions } from 'lib/ng-packages/products/redux/ng-product-types-actions';
import { NgProductTypesStore } from 'lib/ng-packages/products/redux/ng-product-types-store';

@Component({
  selector: 'ss-product-types-edit',
  templateUrl: './product-types-edit.component.html',
  styleUrls: ['./product-types-edit.component.scss']
})
export class ProductTypesEditComponent extends DocumentRecordFormComponent<ProductTypesAppState, ProductType, number, NgProductTypeFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypesFieldsConfig,
    public store: NgProductTypesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
