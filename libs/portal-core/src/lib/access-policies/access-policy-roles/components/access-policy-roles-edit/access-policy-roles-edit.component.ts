import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRolesActions, NgAccessPolicyRulesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyRolesStore } from '@skysmack/ng-core';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRolesFieldsConfig } from '../../ng-access-policy-roles-fields-config';

@Component({
  selector: 'ss-access-policy-roles-edit',
  templateUrl: './access-policy-roles-edit.component.html'
})
export class AccessPolicyRolesEditComponent extends RecordFormComponent<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public fieldsConfig: NgAccessPolicyRolesFieldsConfig,
    public actions: NgAccessPolicyRolesActions,
    public store: NgAccessPolicyRolesStore,
    public skysmackStore: NgSkysmackStore,
    public accessPolicyRulesActions: NgAccessPolicyRulesActions,
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
