import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductPriceChangesActions, NgProductPriceChangesFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgProductPriceChangesStore } from '@skysmack/ng-packages';
import { ProductPriceChangesAppState, PRODUCT_PRICE_CHANGES_AREA_KEY, ProductPriceChanges } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesMenu } from '../../ng-product-price-changes-menu';
import { EntityAction } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-product-price-changes-index',
  templateUrl: './product-price-changes-index.component.html',
  styleUrls: ['./product-price-changes-index.component.scss']
})
export class ProductPriceChangesIndexComponent extends RecordIndexComponent<ProductPriceChangesAppState, ProductPriceChanges, number> implements OnInit {

  public area: string = PRODUCT_PRICE_CHANGES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductPriceChangesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgProductPriceChangesStore,
    public sidebarMenu: NgProductPriceChangesMenu,
    public fieldsConfig: NgProductPriceChangesFieldsConfig,
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
