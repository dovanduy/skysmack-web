import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessPolicyRulesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgAccessPolicyRulesStore } from '@skysmack/ng-core';
import { EntityAction } from '@skysmack/ng-ui';
import { AccessPolicyRulesAppState, AccessPolicyRule, ACCESS_POLICY_RULES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRulesMenu } from '../../ng-access-policy-rules-menu';
import { NgAccessPolicyRulesFieldsConfig } from '../../ng-access-policy-rules-fields-config';

@Component({
  selector: 'ss-access-policy-rules-index',
  templateUrl: './access-policy-rules-index.component.html'
})
export class AccessPolicyRulesIndexComponent extends RecordIndexComponent<AccessPolicyRulesAppState, AccessPolicyRule, number> implements OnInit {

  public areaKey: string = ACCESS_POLICY_RULES_AREA_KEY;
  public titleExtras = true;

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
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
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
