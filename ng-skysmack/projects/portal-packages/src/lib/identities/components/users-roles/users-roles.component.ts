import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgUsersActions, NgSkysmackStore, NgUsersStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { BaseComponent } from '@skysmack/portal-ui';
import { User } from '@skysmack/packages-identities';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-portal-package-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent extends BaseComponent<User, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgUsersActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgUsersStore,
  ) {
    super(router, activatedRoute, redux);
  }

  ngOnInit() {
    this.subscriptionHandler.register(this.activatedRoute.params.pipe(
      map(params => this.actions.getUsersRoles(this.router.url.split('/')[1], [params['id']]))
    ).subscribe());
  }
}
