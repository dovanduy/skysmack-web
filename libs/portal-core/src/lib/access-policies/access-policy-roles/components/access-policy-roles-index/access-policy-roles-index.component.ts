import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessPolicyRolesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgAccessPolicyRolesStore } from '@skysmack/ng-core';
import { EntityAction } from '@skysmack/ng-ui';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRolesMenu } from '../../ng-access-policy-roles-menu';
import { NgAccessPolicyRolesFieldsConfig } from '../../ng-access-policy-roles-fields-config';


@Component({
  selector: 'ss-access-policy-roles-index',
  templateUrl: './access-policy-roles-index.component.html'
})
export class AccessPolicyRolesIndexComponent extends RecordIndexComponent<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> implements OnInit {

  public area: string = ACCESS_POLICY_ROLES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessPolicyRolesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAccessPolicyRolesStore,
    public sidebarMenu: NgAccessPolicyRolesMenu,
    public fieldsConfig: NgAccessPolicyRolesFieldsConfig,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
