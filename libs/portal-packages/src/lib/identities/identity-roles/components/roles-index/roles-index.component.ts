import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE, } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRolesActions, NgRolesStore } from '@skysmack/ng-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Role, RolesAppState, ROLES_AREA_KEY } from '@skysmack/packages-identities';
import { MenuItem } from '@skysmack/framework';
import { NgRolesFieldsConfig } from '../../ng-roles-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';


@Component({
  selector: 'ss-roles-index',
  templateUrl: './roles-index.component.html'
})
export class RolesIndexComponent extends RecordIndexComponent<RolesAppState, Role, number> implements OnInit {
  public static COMPONENT_KEY = 'roles-index';
  public componentKey = RolesIndexComponent.COMPONENT_KEY;

  public areaKey: string = ROLES_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgRolesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgRolesStore,
    public fieldsConfig: NgRolesFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
