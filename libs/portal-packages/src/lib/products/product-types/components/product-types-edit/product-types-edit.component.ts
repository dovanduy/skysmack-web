import { Component, OnInit } from '@angular/core';
import { ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgProductTypesActions, NgProductTypesStore } from '@skysmack/ng-products';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgProductTypesFieldsConfig } from '../../ng-product-types-fields-config';

@Component({
  selector: 'ss-product-types-edit',
  templateUrl: './product-types-edit.component.html'
})
export class ProductTypesEditComponent extends DocumentRecordFormComponent<ProductTypesAppState, ProductType, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypesFieldsConfig,
    public store: NgProductTypesStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
