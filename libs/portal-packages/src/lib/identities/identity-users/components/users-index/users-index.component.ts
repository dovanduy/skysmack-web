import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE, } from '@skysmack/portal-ui';
import { NgUsersActions, NgUsersStore } from '@skysmack/ng-packages';
import { EntityAction } from '@skysmack/ng-ui';
import { User, UsersAppState, USERS_AREA_KEY } from '@skysmack/packages-identities';
import { NgUsersMenu } from '../../ng-users-menu';
import { NgUsersFieldsConfig } from '../../ng-users-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Component({
  selector: 'ss-users-index',
  templateUrl: './users-index.component.html'
})
export class UsersIndexComponent extends RecordIndexComponent<UsersAppState, User, number> implements OnInit {

  public areaKey: string = USERS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asUrlAction('edit/set-password', 'USERS.ENTITY_ACTION.SET_PASSWORD', 'https'),
    new EntityAction().asUrlAction('edit/roles', 'USERS.ENTITY_ACTION.ROLES', 'android'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
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
    public entityActionProviders: EntityActionProviders,
    
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
