import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgUsersActions, NgSkysmackStore, NgUsersStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { BaseComponent } from '@skysmack/portal-ui';
import { User, Role } from '@skysmack/packages-identities';
import { combineLatest, Observable } from 'rxjs';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgRolesStore, NgRolesActions } from '@skysmack/ng-packages';
import { LocalObject, PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';

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
    this.title.setTitle('User roles');
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.getUsersRoles(this.packagePath, [this.entityId]);
    this.rolesActions.getPaged(this.packagePath, new PagedQuery({ pageNumber: 0, pageSize: 0 }));
    this.userRoles$ = this.store.getUserRoles(this.packagePath, this.entityId);

    this.roles$ = combineLatest(
      this.userRoles$,
      this.rolesStore.get(this.packagePath)
    ).pipe(
      map(values => {
        // Only show roles the user isn't in.
        const userRoles = values[0];
        return values[1].filter(role => {
          if (!userRoles.find(userRole => userRole === role.object.name)) {
            return role;
          }
        });
      })
    );

    this.editorNav.showEditorNav();
  }


  public addRole(): void {
    // if (this.userRoles.filter(pr => pr.object.roleId === role.object.id).length === 0) {
    //   this.userRolesRedux.addUserRole(toLocalObject({
    //     userId: this.selectedUser.object.id,
    //     roleId: role.object.id
    //   } as UserRoleViewModel), role.object.name);
    // } else {
    //   // TEMP FEEDBACK FOR WHEN USER IS IN ROLE
    //   this.message = 'User already in role';
    //   setTimeout(() => {
    //     this.message = undefined;
    //   }, 1500);
    // }
  }

  public removeRole(role: LocalObject<Role, number>): void {

  }
}
