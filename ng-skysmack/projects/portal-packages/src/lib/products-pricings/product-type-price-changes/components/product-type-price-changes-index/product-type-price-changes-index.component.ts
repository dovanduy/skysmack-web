import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductTypePriceChangesActions, NgProductTypePriceChangesFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgProductTypePriceChangesStore } from '@skysmack/ng-packages';
import { ProductTypePriceChangesAppState, PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductTypePriceChangesMenu } from '../../ng-product-type-price-changes-menu';
import { EntityAction } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-product-type-price-changes-index',
  templateUrl: './product-type-price-changes-index.component.html'
})
export class ProductTypePriceChangesIndexComponent extends RecordIndexComponent<ProductTypePriceChangesAppState, ProductPriceChange, number> implements OnInit {

  public area: string = PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductTypePriceChangesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgProductTypePriceChangesStore,
    public sidebarMenu: NgProductTypePriceChangesMenu,
    public fieldsConfig: NgProductTypePriceChangesFieldsConfig,
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
