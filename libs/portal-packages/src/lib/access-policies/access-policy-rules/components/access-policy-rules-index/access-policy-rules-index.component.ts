import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuItem } from '@skysmack/framework';
import { AccessPolicyRulesAppState, AccessPolicyRule, ACCESS_POLICY_RULES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRulesMenu } from '../../ng-access-policy-rules-menu';
import { NgAccessPolicyRulesFieldsConfig } from '../../ng-access-policy-rules-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgAccessPolicyRulesActions, NgAccessPolicyRulesStore } from '@skysmack/ng-access-policies';

@Component({
  selector: 'ss-access-policy-rules-index',
  templateUrl: './access-policy-rules-index.component.html'
})
export class AccessPolicyRulesIndexComponent extends RecordIndexComponent<AccessPolicyRulesAppState, AccessPolicyRule, number> implements OnInit {
  public static COMPONENT_KEY = 'access-policy-rules';
  public componentKey = AccessPolicyRulesIndexComponent.COMPONENT_KEY;

  public areaKey: string = ACCESS_POLICY_RULES_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessPolicyRulesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAccessPolicyRulesStore,
    public sidebarMenu: NgAccessPolicyRulesMenu,
    public fieldsConfig: NgAccessPolicyRulesFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
