import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle, RecordIndexComponent, } from '@skysmack/portal-ui';
import { NgUsersActions, NgUsersStore, NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityAction } from '@skysmack/ng-ui';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { NgUsersMenu } from './../../ng-users-menu';
import { NgUsersFieldsConfig } from '../../ng-users-fields-config';


@Component({
  selector: 'ss-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss']
})
export class UsersIndexComponent extends RecordIndexComponent<UsersAppState, User, number> implements OnInit {

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asUrlAction('edit/set-password', 'Set password', 'https'),
    new EntityAction().asUrlAction('edit/roles', 'Roles', 'android'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgUsersActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgUsersStore,
    public sidebarMenu: NgUsersMenu,
    public fieldsConfig: NgUsersFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
