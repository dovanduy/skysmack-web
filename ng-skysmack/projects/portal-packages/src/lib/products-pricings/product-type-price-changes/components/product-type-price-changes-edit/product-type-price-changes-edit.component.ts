import { Component, OnInit } from '@angular/core';
import { ProductTypePriceChangesAppState, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductTypePriceChangesActions, NgProductTypeSalesPriceActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductTypePriceChangesStore } from '@skysmack/ng-packages';
import { PagedQuery } from '@skysmack/framework';
import { NgProductTypePriceChangesFieldsConfig, NgProductTypePriceChangesFormDependencies } from '../../ng-product-type-price-changes-fields-config';

@Component({
  selector: 'ss-product-type-price-changes-edit',
  templateUrl: './product-type-price-changes-edit.component.html',
  styleUrls: ['./product-type-price-changes-edit.component.scss']
})
export class ProductTypePriceChangesEditComponent extends RecordFormComponent<ProductTypePriceChangesAppState, ProductPriceChange, number, NgProductTypePriceChangesFormDependencies> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductTypePriceChangesActions,
    public productTypeSalesPriceActions: NgProductTypeSalesPriceActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductTypePriceChangesFieldsConfig,
    public store: NgProductTypePriceChangesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.productTypeSalesPriceActions.getPaged(this.packagePath, new PagedQuery());
    this.setEditFields();
  }
}
