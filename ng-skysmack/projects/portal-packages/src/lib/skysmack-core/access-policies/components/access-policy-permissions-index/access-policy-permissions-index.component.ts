import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessPolicyPermissionsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgAccessPolicyPermissionsStore } from '@skysmack/ng-packages';
import { EntityAction } from '@skysmack/ng-ui';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission, ACCESS_POLICY_PERMISSIONS_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyPermissionsMenu } from '../../ng-access-policy-permissions-menu';
import { NgAccessPolicyPermissionsFieldsConfig } from '../../ng-access-policy-permissions-fields-config';

@Component({
  selector: 'ss-access-policy-permissions-index',
  templateUrl: './access-policy-permissions-index.component.html'
})
export class AccessPolicyPermissionsIndexComponent extends RecordIndexComponent<AccessPolicyPermissionsAppState, AccessPolicyPermission, number> implements OnInit {

  public area: string = ACCESS_POLICY_PERMISSIONS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessPolicyPermissionsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAccessPolicyPermissionsStore,
    public sidebarMenu: NgAccessPolicyPermissionsMenu,
    public fieldsConfig: NgAccessPolicyPermissionsFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
