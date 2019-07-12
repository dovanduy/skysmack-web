import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyPermissionsActions, NgAccessPolicyRulesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore, NgSkysmackActions } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgAccessPolicyPermissionsStore } from '@skysmack/ng-packages';
import { AccessPolicyPermission, AccessPolicyPermissionsAppState } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyPermissionsFieldsConfig } from '../../ng-access-policy-permissions-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-access-policy-permissions-create',
  templateUrl: './access-policy-permissions-create.component.html'
})
export class AccessPolicyPermissionsCreateComponent extends RecordFormComponent<AccessPolicyPermissionsAppState, AccessPolicyPermission, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public store: NgAccessPolicyPermissionsStore,
    public actions: NgAccessPolicyPermissionsActions,
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions,
    public accessPolicyRulesActions: NgAccessPolicyRulesActions,
    public fieldsConfig: NgAccessPolicyPermissionsFieldsConfig,
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    // TODO: Is it necesssary?
    this.skysmackActions.getSkysmack(); 
    this.setCreateFields();
  }
}
