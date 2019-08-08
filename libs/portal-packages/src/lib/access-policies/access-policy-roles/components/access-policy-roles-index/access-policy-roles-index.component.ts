import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuItem } from '@skysmack/framework';
import { AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRolesFieldsConfig } from '../../ng-access-policy-roles-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgAccessPolicyRolesActions, NgAccessPolicyRolesStore } from '@skysmack/ng-access-policies';


@Component({
  selector: 'ss-access-policy-roles-index',
  templateUrl: './access-policy-roles-index.component.html'
})
export class AccessPolicyRolesIndexComponent extends RecordIndexComponent<AccessPolicyRolesAppState, AccessPolicyRole, AccessPolicyRoleKey> implements OnInit {
  public static COMPONENT_KEY = 'access-policy-roles';
  public componentKey = AccessPolicyRolesIndexComponent.COMPONENT_KEY;

  public areaKey: string = ACCESS_POLICY_ROLES_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessPolicyRolesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAccessPolicyRolesStore,
    public fieldsConfig: NgAccessPolicyRolesFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
