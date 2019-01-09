import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgUsersActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgUsersStore } from '@skysmack/ng-packages';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { NgUsersMenu } from './../../ng-users-menu';
import { EntityAction } from '@skysmack/ng-ui';


@Component({
  selector: 'ss-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss']
})
export class UsersIndexComponent extends RecordIndexComponent<UsersAppState, User, number> implements OnInit {

  public displayedColumns = ['email'];
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
    public sidebarMenu: NgUsersMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
