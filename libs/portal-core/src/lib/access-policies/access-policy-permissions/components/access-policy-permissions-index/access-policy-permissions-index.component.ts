import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessPolicyPermissionsActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgAccessPolicyPermissionsStore } from '@skysmack/ng-core';
import { MenuItem } from '@skysmack/framework';
import { AccessPolicyPermissionsAppState, AccessPolicyPermission, ACCESS_POLICY_PERMISSIONS_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyPermissionsMenu } from '../../ng-access-policy-permissions-menu';
import { NgAccessPolicyPermissionsFieldsConfig } from '../../ng-access-policy-permissions-fields-config';

@Component({
  selector: 'ss-access-policy-permissions-index',
  templateUrl: './access-policy-permissions-index.component.html'
})
export class AccessPolicyPermissionsIndexComponent extends RecordIndexComponent<AccessPolicyPermissionsAppState, AccessPolicyPermission, number> implements OnInit {

  public areaKey: string = ACCESS_POLICY_PERMISSIONS_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessPolicyPermissionsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAccessPolicyPermissionsStore,
    public sidebarMenu: NgAccessPolicyPermissionsMenu,
    public fieldsConfig: NgAccessPolicyPermissionsFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
