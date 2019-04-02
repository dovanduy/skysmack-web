import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyPermissionsActions, NgSkysmackActions, NgAccessPolicyRulesStore, NgAccessPolicyRulesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyPermissionsStore } from '@skysmack/ng-packages';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission } from '@skysmack/packages-skysmack-core';
import { PagedQuery, LocalObjectStatus } from '@skysmack/framework';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormHelper } from '@skysmack/ng-ui';
import { NgAccessPolicyPermissionsFieldsConfig, NgAccessPolicyPermissionFormDependencies } from '../../ng-access-policy-permissions-fields-config';

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
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions,
    public store: NgAccessPolicyPermissionsStore,
    public actions: NgAccessPolicyPermissionsActions,
    public accessPolicyRulesStore: NgAccessPolicyRulesStore,
    public accessPolicyRulesActions: NgAccessPolicyRulesActions,
    public fieldsConfig: NgAccessPolicyPermissionsFieldsConfig,
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  public setEditFields() {
    this.skysmackActions.getSkysmack();
    this.accessPolicyRulesActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.initEditRecord(),
      this.skysmackStore.getPackages(),
      this.accessPolicyRulesStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const entity = values[0];
        const installedPackages = values[1];
        const availableAccessPolicyRules = values[2];
        this.selectedEntity = entity;
        return this.fieldsConfig.getFields(entity, undefined, { installedPackages, availableAccessPolicyRules });
      })
    );
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
