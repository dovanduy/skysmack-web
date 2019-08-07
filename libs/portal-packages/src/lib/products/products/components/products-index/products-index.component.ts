import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Product, ProductsAppState, PRODUCTS_AREA_KEY } from '@skysmack/packages-products';
import { NgProductsFieldsConfig } from '../../ng-products-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';
import { NgProductsActions, NgProductsStore } from '@skysmack/ng-products';

@Component({
  selector: 'ss-products-index',
  templateUrl: './products-index.component.html'
})
export class ProductsIndexComponent extends DocumentRecordIndexComponent<ProductsAppState, Product, number> implements OnInit {
  public static COMPONENT_KEY = 'products-index';
  public componentKey = ProductsIndexComponent.COMPONENT_KEY;

  public areaKey: string = PRODUCTS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgProductsStore,
    public fieldsConfig: NgProductsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
