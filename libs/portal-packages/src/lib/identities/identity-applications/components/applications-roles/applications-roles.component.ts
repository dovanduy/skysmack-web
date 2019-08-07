import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgApplicationsActions, NgApplicationsStore, NgRolesStore, NgRolesActions } from '@skysmack/ng-identities';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { Application, Role } from '@skysmack/packages-identities';
import { combineLatest, Observable } from 'rxjs';
import { EditorNavService } from '@skysmack/portal-ui';
import { LocalObject, PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-portal-package-applications-roles',
  templateUrl: './applications-roles.component.html',
  styleUrls: ['./applications-roles.component.scss']
})
export class ApplicationsRolesComponent extends BaseComponent<Application, number> implements OnInit {

  public applicationRoles$: Observable<string[]>;
  public roles$: Observable<LocalObject<Role, number>[]>;
  public message: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgApplicationsActions,
    public rolesStore: NgRolesStore,
    public rolesActions: NgRolesActions,
    public editorNav: EditorNavService,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgApplicationsStore
  ) {
    super(router, activatedRoute, redux);
    this.title.setTitle('IDENTITIES.APPLICATIONS_ROLES_TITLE');
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.getApplicationsRoles(this.packagePath, [this.entityId]);
    this.applicationRoles$ = this.store.getApplicationRoles(this.packagePath, this.entityId);
    this.getRoles();
    this.editorNav.showEditorNav();
  }

  public addRole(role: LocalObject<Role, number>): void {
    const dic = {};
    dic[this.entityId] = [role.object.name];
    this.actions.addApplicationsRoles(this.packagePath, dic);
  }

  public trackById(item: any) {
    return item.id;
  }

  public removeRole(applicationRole: string): void {
    const dic = {};
    dic[this.entityId] = [applicationRole];
    this.actions.removeApplicationsRoles(this.packagePath, dic);
  }

  private getRoles() {
    this.rolesActions.getPaged(this.packagePath, new PagedQuery());
    console.log('getRoles')
    this.roles$ = combineLatest(this.applicationRoles$, this.rolesStore.get(this.packagePath)).pipe(map(values => {
      // Only show roles the user isn't in.
      const applicationRoles = values[0];
      console.log('values', values[0]);
      return values[1].filter(role => {
        if (!applicationRoles.find(applicationRole => applicationRole === role.object.name)) {
          return role;
        }
      });
    }));
  }
}
