import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE, } from '@skysmack/portal-ui';
import { NgUsersActions, NgUsersStore } from '@skysmack/ng-identities';
import { MenuItem } from '@skysmack/framework';
import { User, UsersAppState, USERS_AREA_KEY } from '@skysmack/packages-identities';
import { NgUsersMenu } from '../../ng-users-menu';
import { NgUsersFieldsConfig } from '../../ng-users-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';


@Component({
  selector: 'ss-users-index',
  templateUrl: './users-index.component.html'
})
export class UsersIndexComponent extends RecordIndexComponent<UsersAppState, User, number> implements OnInit {

  public areaKey: string = USERS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asUrlAction('edit/set-password', 'USERS.ENTITY_ACTION.SET_PASSWORD', 'https'),
    new MenuItem().asUrlAction('edit/roles', 'USERS.ENTITY_ACTION.ROLES', 'android'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgUsersActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgUsersStore,
    public sidebarMenu: NgUsersMenu,
    public fieldsConfig: NgUsersFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders,

  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
