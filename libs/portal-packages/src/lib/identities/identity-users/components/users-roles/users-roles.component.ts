import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgUsersActions, NgUsersStore, NgRolesStore, NgRolesActions } from '@skysmack/ng-identities';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { User, Role, UserRoles } from '@skysmack/packages-identities';
import { combineLatest, Observable } from 'rxjs';
import { EditorNavService } from '@skysmack/portal-ui';
import { LocalObject, PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-portal-package-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent extends BaseComponent<User, number> implements OnInit {

  public userRoles$: Observable<string[]>;
  public roles$: Observable<LocalObject<Role, number>[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgUsersActions,
    public rolesStore: NgRolesStore,
    public rolesActions: NgRolesActions,
    public editorNav: EditorNavService,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgUsersStore
  ) {
    super(router, activatedRoute, redux);
    this.title.setTitle('IDENTITIES.USERS_ROLES_TITLE');
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.getUsersRoles(this.packagePath, [this.entityId]);
    this.userRoles$ = this.store.getUserRoles(this.packagePath, this.entityId);
    this.getRoles();
  }

  public addRole(role: LocalObject<Role, number>): void {
    this.actions.addUsersRoles(this.packagePath, [new UserRoles({
      userId: Number(this.entityId),
      roleNames: [role.object.name]
    })]);
  }

  public trackById(item: any) {
    return item.id;
  }

  public removeRole(userRole: string): void {
    this.actions.removeUsersRoles(this.packagePath, [new UserRoles({
      userId: Number(this.entityId),
      roleNames: [userRole]
    })]);
  }

  private getRoles() {
    this.rolesActions.getPaged(this.packagePath, new PagedQuery());
    this.roles$ = combineLatest([
      this.userRoles$,
      this.rolesStore.get(this.packagePath)
    ]).pipe(map(values => {
      // Only show roles the user isn't in.
      const userRoles = values[0];
      return values[1].filter(role => {
        if (!userRoles.find(userRole => userRole === role.object.name)) {
          return role;
        }
      });
    }));
  }
}
