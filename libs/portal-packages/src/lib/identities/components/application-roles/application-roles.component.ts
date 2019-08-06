import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgUsersActions, NgUsersStore, NgRolesStore, NgRolesActions } from '@skysmack/ng-identities';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { User, Role } from '@skysmack/packages-identities';
import { combineLatest, Observable } from 'rxjs';
import { EditorNavService } from '@skysmack/portal-ui';
import { LocalObject, PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-portal-package-application-roles',
  templateUrl: './application-roles.component.html',
  styleUrls: ['./application-roles.component.scss']
})
export class ApplicationRolesComponent extends BaseComponent<User, number> implements OnInit {

  public applicationRoles$: Observable<string[]>;
  public roles$: Observable<LocalObject<Role, number>[]>;
  public message: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgUsersActions, // TODO: Make into application actions
    public rolesStore: NgRolesStore,
    public rolesActions: NgRolesActions,
    public editorNav: EditorNavService,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgUsersStore // TODO: Make into application store
  ) {
    super(router, activatedRoute, redux);
    this.title.setTitle('IDENTITIES.APPLICATIONS_ROLES_TITLE');
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.getUsersRoles(this.packagePath, [this.entityId]);
    this.applicationRoles$ = this.store.getUserRoles(this.packagePath, this.entityId);
    this.getRoles();
    this.editorNav.showEditorNav();
  }

  public addRole(role: LocalObject<Role, number>): void {
    const dic = {};
    dic[this.entityId] = [role.object.name];
    this.actions.addUsersRoles(this.packagePath, dic);
  }

  public trackById(item: any) {
    return item.id;
  }

  public removeRole(applicationRole: string): void {
    const dic = {};
    dic[this.entityId] = [applicationRole];
    this.actions.removeUsersRoles(this.packagePath, dic);
  }

  private getRoles() {
    this.rolesActions.getPaged(this.packagePath, new PagedQuery());
    this.roles$ = combineLatest(this.applicationRoles$, this.rolesStore.get(this.packagePath)).pipe(map(values => {
      // Only show roles the user isn't in.
      const applicationRoles = values[0];
      return values[1].filter(role => {
        if (!applicationRoles.find(applicationRole => applicationRole === role.object.name)) {
          return role;
        }
      });
    }));
  }
}
