import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyPermissionsActions, NgSkysmackActions, NgAccessPolicyRulesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyPermissionsStore } from '@skysmack/ng-core';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission } from '@skysmack/packages-skysmack-core';
import { LocalObjectStatus } from '@skysmack/framework';
import { FormHelper } from '@skysmack/ng-ui';
import { NgAccessPolicyPermissionsFieldsConfig } from '../../ng-access-policy-permissions-fields-config';

@Component({
  selector: 'ss-access-policy-permissions-edit',
  templateUrl: './access-policy-permissions-edit.component.html'
})
export class AccessPolicyPermissionsEditComponent extends RecordFormComponent<AccessPolicyPermissionsAppState, AccessPolicyPermission, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions,
    public store: NgAccessPolicyPermissionsStore,
    public actions: NgAccessPolicyPermissionsActions,
    public accessPolicyRulesActions: NgAccessPolicyRulesActions,
    public fieldsConfig: NgAccessPolicyPermissionsFieldsConfig,
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  protected update(fh: FormHelper) {
    fh.formValid(() => {
      const oldValue = { ...this.selectedEntity };

      this.selectedEntity.object = fh.form.getRawValue();
      this.selectedEntity.status = LocalObjectStatus.MODIFYING;

      this.selectedEntity.oldObject = oldValue.object;
      this.actions.update([this.selectedEntity], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
