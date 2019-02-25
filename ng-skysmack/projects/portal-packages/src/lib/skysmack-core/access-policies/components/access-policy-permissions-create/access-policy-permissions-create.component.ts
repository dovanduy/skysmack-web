import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyPermissionsActions, NgSkysmackActions, NgAccessPolicyRulesActions, NgAccessPolicyRulesStore, NgPackagesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyPermissionsFieldsConfig, NgAccessPolicyPermissionFormDependencies } from '@skysmack/ng-packages';
import { NgAccessPolicyPermissionsStore } from '@skysmack/ng-packages';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission } from '@skysmack/packages-skysmack-core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedQuery } from '@skysmack/framework';

@Component({
  selector: 'ss-access-policy-permissions-create',
  templateUrl: './access-policy-permissions-create.component.html',
  styleUrls: ['./access-policy-permissions-create.component.scss']
})
export class AccessPolicyPermissionsCreateComponent extends RecordFormComponent<AccessPolicyPermissionsAppState, AccessPolicyPermission, number, NgAccessPolicyPermissionFormDependencies> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public store: NgAccessPolicyPermissionsStore,
    public actions: NgAccessPolicyPermissionsActions,
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions,
    public accessPolicyRulesStore: NgAccessPolicyRulesStore,
    public accessPolicyRulesActions: NgAccessPolicyRulesActions,
    public packagesActions: NgPackagesActions,
    public fieldsConfig: NgAccessPolicyPermissionsFieldsConfig,
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.packagesActions.getAvailablePackages();
    this.accessPolicyRulesActions.getPaged(this.packagePath, new PagedQuery());

    this.subscriptionHandler.register(combineLatest(
      this.skysmackStore.getPackages(),
      this.accessPolicyRulesStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const installedPackages = values[0];
        const availableAccessPolicyRules = values[1];
        return this.fieldsConfig.getFields(undefined, undefined, { installedPackages, availableAccessPolicyRules });
      })
    ).subscribe(fields => this.fields = fields));
  }
}
