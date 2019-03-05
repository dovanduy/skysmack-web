import { Component, OnInit } from '@angular/core';
import { Product, ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgProductTypesFieldsConfig, NgProductTypeFormDependencies } from '@skysmack/ng-packages';
import { NgProductTypesActions } from '@skysmack/ng-packages';
import { NgProductTypesStore } from '@skysmack/ng-packages';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';

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
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldReduxStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
