import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessPolicyRolesActions, NgAccessPolicyRolesFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgAccessPolicyRolesStore } from '@skysmack/ng-packages';
import { EntityAction } from '@skysmack/ng-ui';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRolesMenu } from '../../ng-access-policy-roles-menu';


@Component({
  selector: 'ss-access-policy-roles-index',
  templateUrl: './access-policy-roles-index.component.html',
  styleUrls: ['./access-policy-roles-index.component.scss']
})
export class AccessPolicyRolesIndexComponent extends RecordIndexComponent<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> implements OnInit {

  public area: string = ACCESS_POLICY_ROLES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessPolicyRolesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAccessPolicyRolesStore,
    public sidebarMenu: NgAccessPolicyRolesMenu,
    public fieldsConfig: NgAccessPolicyRolesFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
