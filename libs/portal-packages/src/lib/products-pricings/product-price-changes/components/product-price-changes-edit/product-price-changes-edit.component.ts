import { Component, OnInit } from '@angular/core';
import { ProductPriceChangesAppState, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesActions, NgProductsSalesPriceActions, NgProductPriceChangesStore } from '@skysmack/ng-products-pricings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgProductPriceChangesFieldsConfig } from '../../ng-product-price-changes-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-price-changes-edit',
  templateUrl: './product-price-changes-edit.component.html'
})
export class ProductPriceChangesEditComponent extends RecordFormComponent<ProductPriceChangesAppState, ProductPriceChange, number> implements OnInit {
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
    this.setEditFields();
  }
}
