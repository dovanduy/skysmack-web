import { Component, OnInit } from '@angular/core';
import { ProductTypePriceChangesAppState, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductTypesActions } from '@skysmack/ng-products';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgProductTypePriceChangesStore, NgProductTypePriceChangesActions } from '@skysmack/ng-products-pricings';
import { NgProductTypePriceChangesFieldsConfig } from '../../ng-product-type-price-changes-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-type-price-changes-create',
  templateUrl: './product-type-price-changes-create.component.html'
})
export class ProductTypePriceChangesCreateComponent extends RecordFormComponent<ProductTypePriceChangesAppState, ProductPriceChange, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypePriceChangesActions,
    public productTypesActions: NgProductTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypePriceChangesFieldsConfig,
    public store: NgProductTypePriceChangesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
