import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRolesActions, NgAccessPolicyRulesStore, NgAccessPolicyRulesActions, NgRolesStore, NgRolesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyRolesStore, NgAccessPolicyRoleFormDependencies, NgAccessPolicyRolesFieldsConfig } from '@skysmack/ng-packages';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedQuery } from '@skysmack/framework';
import { IDENTITES_AREA_KEY } from '@skysmack/packages-identities';


@Component({
  selector: 'ss-access-policy-roles-edit',
  templateUrl: './access-policy-roles-edit.component.html'
})
export class AccessPolicyRolesEditComponent extends RecordFormComponent<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey, NgAccessPolicyRoleFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public fieldsConfig: NgAccessPolicyRolesFieldsConfig,
    public actions: NgAccessPolicyRolesActions,
    public store: NgAccessPolicyRolesStore,
    public skysmackStore: NgSkysmackStore,
    public accessPolicyRulesStore: NgAccessPolicyRulesStore,
    public accessPolicyRulesActions: NgAccessPolicyRulesActions,
    public rolesStore: NgRolesStore,
    public rolesActions: NgRolesActions
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  public setCreateFields() {
    this.accessPolicyRulesActions.getPaged(this.packagePath, new PagedQuery());
    // TODO: FIX THIS!! MAJOR HACK!! WE NEED TO GET/CHOOSE ROLES AMONG ALL IDENTITY PACKAGES.
    // IDENTITES_AREA_KEY BELOW IS JUST THE DEFAULT INSTALLED PACKAGE!
    this.rolesActions.getPaged(IDENTITES_AREA_KEY, new PagedQuery());

    this.fields$ = combineLatest(
      this.initEditRecord(),
      this.accessPolicyRulesStore.get(this.packagePath),
      // TODO: FIX THIS TOO!!
      this.rolesStore.get(IDENTITES_AREA_KEY)
    ).pipe(
      map(values => {
        const entity = values[0];
        const availableAccessPolicyRules = values[1];
        const availableRoles = values[2];
        this.selectedEntity = entity;
        return this.fieldsConfig.getFields(entity, undefined, { availableAccessPolicyRules, availableRoles });
      })
    );
  }
}
