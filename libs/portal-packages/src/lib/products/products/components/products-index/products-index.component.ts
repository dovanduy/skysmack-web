import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgProductsStore } from '@skysmack/ng-packages';
import { Product, ProductsAppState, PRODUCTS_AREA_KEY } from '@skysmack/packages-products';
import { NgProductsMenu } from '../../ng-products-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgProductsFieldsConfig } from '../../ng-products-fields-config';

@Component({
  selector: 'ss-products-index',
  templateUrl: './products-index.component.html'
})
export class ProductsIndexComponent extends DocumentRecordIndexComponent<ProductsAppState, Product, number> implements OnInit {

  public areaKey: string = PRODUCTS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductsActions,
    public redux: NgSkysmackStore,
    public store: NgProductsStore,
    public sidebarMenu: NgProductsMenu,
    public fieldsConfig: NgProductsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
