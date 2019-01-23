import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessPolicyRulesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgAccessPolicyRulesStore } from '@skysmack/ng-packages';
import { EntityAction } from '@skysmack/ng-ui';
import { AccessPolicyRulesAppState, AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRulesMenu } from '../../ng-access-policy-rules-menu';


@Component({
  selector: 'ss-access-policy-rules-index',
  templateUrl: './access-policy-rules-index.component.html',
  styleUrls: ['./access-policy-rules-index.component.scss']
})
export class AccessPolicyRulesIndexComponent extends RecordIndexComponent<AccessPolicyRulesAppState, AccessPolicyRule, number> implements OnInit {

  public displayedColumns = ['access', 'authenticated', 'includeRoles'];
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
    public sidebarMenu: NgAccessPolicyRulesMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
