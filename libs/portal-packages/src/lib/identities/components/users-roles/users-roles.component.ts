import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgUsersActions, NgUsersStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { BaseComponent } from '@skysmack/portal-ui';
import { User, Role } from '@skysmack/packages-identities';
import { combineLatest, Observable } from 'rxjs';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgRolesStore, NgRolesActions } from '@skysmack/ng-packages';
import { LocalObject, PagedQuery } from '@skysmack/framework';
import { map, take, tap } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-portal-package-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent extends BaseComponent<User, number> implements OnInit {

  public userRoles$: Observable<string[]>;
  public roles$: Observable<LocalObject<Role, number>[]>;
  public message: string;

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
    this.editorNav.showEditorNav();
  }

  public addRole(role: LocalObject<Role, number>): void {
    const dic = {};
    dic[this.entityId] = [role.object.name];
    this.actions.addUsersRoles(this.packagePath, dic);
  }

  public trackById(index: any, item: any) {
    return item.id;
  }

  public removeRole(userRole: string): void {
    const dic = {};
    dic[this.entityId] = [userRole];
    this.actions.removeUsersRoles(this.packagePath, dic);
  }

  private getRoles() {
    this.rolesActions.getPaged(this.packagePath, new PagedQuery());
    this.roles$ = combineLatest(this.userRoles$, this.rolesStore.get(this.packagePath)).pipe(map(values => {
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
