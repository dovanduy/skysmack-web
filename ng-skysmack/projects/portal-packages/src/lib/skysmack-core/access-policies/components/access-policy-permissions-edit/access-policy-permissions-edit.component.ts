import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyPermissionsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyPermissionsFieldsConfig, NgAccessPolicyPermissionFormDependencies } from '@skysmack/ng-packages';
import { NgAccessPolicyPermissionsStore } from '@skysmack/ng-packages';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission } from '@skysmack/packages-skysmack-core';

@Component({
  selector: 'ss-access-policy-permissions-edit',
  templateUrl: './access-policy-permissions-edit.component.html',
  styleUrls: ['./access-policy-permissions-edit.component.scss']
})
export class AccessPolicyPermissionsEditComponent extends RecordFormComponent<AccessPolicyPermissionsAppState, AccessPolicyPermission, number, NgAccessPolicyPermissionFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAccessPolicyPermissionsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAccessPolicyPermissionsFieldsConfig,
    public store: NgAccessPolicyPermissionsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
