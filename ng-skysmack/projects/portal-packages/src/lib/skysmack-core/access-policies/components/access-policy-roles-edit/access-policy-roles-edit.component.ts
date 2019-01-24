import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRolesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyRolesStore, NgAccessPolicyRoleFormDependencies, NgAccessPolicyRolesFieldsConfig } from '@skysmack/ng-packages';
import { AccessPolicyRolesAppState, AccessPolicyRole } from '@skysmack/packages-skysmack-core';

@Component({
  selector: 'ss-access-policy-roles-edit',
  templateUrl: './access-policy-roles-edit.component.html',
  styleUrls: ['./access-policy-roles-edit.component.scss']
})
export class AccessPolicyRolesEditComponent extends RecordFormComponent<AccessPolicyRolesAppState, AccessPolicyRole, number, NgAccessPolicyRoleFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAccessPolicyRolesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAccessPolicyRolesFieldsConfig,
    public store: NgAccessPolicyRolesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
