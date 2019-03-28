import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessPolicyRulesActions, NgAccessPolicyRulesFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgAccessPolicyRulesStore } from '@skysmack/ng-packages';
import { EntityAction } from '@skysmack/ng-ui';
import { AccessPolicyRulesAppState, AccessPolicyRule, ACCESS_POLICY_RULES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRulesMenu } from '../../ng-access-policy-rules-menu';


@Component({
  selector: 'ss-access-policy-rules-index',
  templateUrl: './access-policy-rules-index.component.html',
  styleUrls: ['./access-policy-rules-index.component.scss']
})
export class AccessPolicyRulesIndexComponent extends RecordIndexComponent<AccessPolicyRulesAppState, AccessPolicyRule, number> implements OnInit {

  public area: string = ACCESS_POLICY_RULES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessPolicyRulesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAccessPolicyRulesStore,
    public sidebarMenu: NgAccessPolicyRulesMenu,
    public fieldsConfig: NgAccessPolicyRulesFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
