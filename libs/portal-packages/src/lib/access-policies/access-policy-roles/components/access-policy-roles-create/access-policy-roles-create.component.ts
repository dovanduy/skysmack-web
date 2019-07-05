import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRolesActions, NgAccessPolicyRulesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyRolesStore } from '@skysmack/ng-packages';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { PagedQuery, toLocalObject, LocalObjectStatus } from '@skysmack/framework';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { NgAccessPolicyRolesFieldsConfig } from '../../ng-access-policy-roles-fields-config';

@Component({
  selector: 'ss-access-policy-roles-create',
  templateUrl: './access-policy-roles-create.component.html'
})
export class AccessPolicyRolesCreateComponent extends RecordFormComponent<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public fieldsConfig: NgAccessPolicyRolesFieldsConfig,
    public actions: NgAccessPolicyRolesActions,
    public store: NgAccessPolicyRolesStore,
    public skysmackStore: NgSkysmackStore,
    public accessPolicyRulesActions: NgAccessPolicyRulesActions
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.accessPolicyRulesActions.getPaged(this.packagePath, new PagedQuery());
    this.setCreateFields();
  }

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = toLocalObject(new AccessPolicyRole({ id: fh.form.getRawValue() }));
      localObject.status = LocalObjectStatus.CREATING;
      localObject.isNew = true;

      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
      this.actions.add([localObject], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
