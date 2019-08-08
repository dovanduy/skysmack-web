import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductTypesActions, NgProductTypesStore } from '@skysmack/ng-products';
import { ProductTypesAppState, ProductType, PRODUCT_TYPES_AREA_KEY } from '@skysmack/packages-products';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgProductTypesFieldsConfig } from '../../ng-product-types-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-product-types-index',
  templateUrl: './product-types-index.component.html'
})
export class ProductTypesIndexComponent extends DocumentRecordIndexComponent<ProductTypesAppState, ProductType, number> implements OnInit {
  public static COMPONENT_KEY = 'product-types-index';
  public componentKey = ProductTypesIndexComponent.COMPONENT_KEY;

  public areaKey = PRODUCT_TYPES_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductTypesActions,
    public redux: NgSkysmackStore,
    public store: NgProductTypesStore,
    public fieldsConfig: NgProductTypesFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
