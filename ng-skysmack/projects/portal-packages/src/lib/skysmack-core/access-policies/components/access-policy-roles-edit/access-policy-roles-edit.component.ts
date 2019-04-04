import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRolesActions, NgAccessPolicyRulesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyRolesStore } from '@skysmack/ng-packages';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { PagedQuery } from '@skysmack/framework';
import { NgAccessPolicyRolesFieldsConfig } from '../../ng-access-policy-roles-fields-config';

@Component({
  selector: 'ss-access-policy-roles-edit',
  templateUrl: './access-policy-roles-edit.component.html',
  styleUrls: ['./access-policy-roles-edit.component.scss']
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
    this.accessPolicyRulesActions.getPaged(this.packagePath, new PagedQuery());
    this.setEditFields();
  }
}
