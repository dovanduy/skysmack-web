import { Component, OnInit } from '@angular/core';
import { ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import {  EditorNavService } from '@skysmack/portal-ui';
import { NgProductTypesStore, NgProductTypesActions } from '@skysmack/ng-products';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgProductTypesFieldsConfig } from '../../ng-product-types-fields-config';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-types-create',
  templateUrl: './product-types-create.component.html'
})
export class ProductTypesCreateComponent extends DocumentRecordFormComponent<ProductTypesAppState, ProductType, number> implements OnInit {

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
    this.setCreateFields();
  }
}
