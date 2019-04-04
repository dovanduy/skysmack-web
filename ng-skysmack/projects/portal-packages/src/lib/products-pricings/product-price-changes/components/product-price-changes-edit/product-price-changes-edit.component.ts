import { Component, OnInit } from '@angular/core';
import { ProductPriceChangesAppState, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesActions, NgProductsSalesPriceActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgProductPriceChangesStore } from '@skysmack/ng-packages';
import { PagedQuery } from '@skysmack/framework';
import { NgProductPriceChangesFieldsConfig, NgProductPriceChangesFormDependencies } from '../../ng-product-price-changes-fields-config';

@Component({
  selector: 'ss-product-price-changes-edit',
  templateUrl: './product-price-changes-edit.component.html',
  styleUrls: ['./product-price-changes-edit.component.scss']
})
export class ProductPriceChangesEditComponent extends RecordFormComponent<ProductPriceChangesAppState, ProductPriceChange, number, NgProductPriceChangesFormDependencies> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgProductPriceChangesActions,
    public productsSalesPriceActions: NgProductsSalesPriceActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgProductPriceChangesFieldsConfig,
    public store: NgProductPriceChangesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.productsSalesPriceActions.getPaged(this.packagePath, new PagedQuery());
    this.setEditFields();
  }
}
