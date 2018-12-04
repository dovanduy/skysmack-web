import { Component, OnInit } from '@angular/core';
import { Product, ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { NgProductTypesFieldsConfig, NgProductTypeFormDependencies } from 'lib/ng-packages/products/ng-product-types-fields-config';
import { NgProductTypesActions } from 'lib/ng-packages/products/redux/ng-product-types-actions';
import { NgProductTypesStore } from 'lib/ng-packages/products/redux/ng-product-types-store';

@Component({
  selector: 'ss-product-types-create',
  templateUrl: './product-types-create.component.html',
  styleUrls: ['./product-types-create.component.scss']
})
export class ProductTypesCreateComponent extends DocumentRecordFormComponent<ProductTypesAppState, ProductType, number, NgProductTypeFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypesActions,
    public redux: NgSkysmackRedux,
    public fieldsConfig: NgProductTypesFieldsConfig,
    public store: NgProductTypesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
