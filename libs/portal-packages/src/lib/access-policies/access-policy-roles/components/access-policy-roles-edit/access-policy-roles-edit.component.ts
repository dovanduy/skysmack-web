import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRolesActions, NgAccessPolicyRulesActions, NgAccessPolicyRolesStore } from '../../../../../../../ng-packages/ng-access-policies/src/lib';
import { NgSkysmackStore, NgSkysmackActions } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRolesFieldsConfig } from '../../ng-access-policy-roles-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

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
    public skysmackActions: NgSkysmackActions,
    public skysmackStore: NgSkysmackStore,
    public accessPolicyRulesActions: NgAccessPolicyRulesActions,
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.skysmackActions.getSkysmack(); 
    this.setEditFields();
  }
}
