import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductPriceChangesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgProductPriceChangesStore } from '@skysmack/ng-packages';
import { ProductPriceChangesAppState, PRODUCT_PRICE_CHANGES_AREA_KEY, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { NgProductPriceChangesMenu } from '../../ng-product-price-changes-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgProductPriceChangesFieldsConfig } from '../../ng-product-price-changes-fields-config';

@Component({
  selector: 'ss-product-price-changes-index',
  templateUrl: './product-price-changes-index.component.html'
})
export class ProductPriceChangesIndexComponent extends RecordIndexComponent<ProductPriceChangesAppState, ProductPriceChange, number> implements OnInit {

  public areaKey: string = PRODUCT_PRICE_CHANGES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductPriceChangesActions,
    public redux: NgSkysmackStore,
    public store: NgProductPriceChangesStore,
    public sidebarMenu: NgProductPriceChangesMenu,
    public fieldsConfig: NgProductPriceChangesFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
