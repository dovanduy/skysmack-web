import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRulesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyRulesStore } from '@skysmack/ng-packages';
import { AccessPolicyRulesAppState, AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRuleFormDependencies, NgAccessPolicyRulesFieldsConfig } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-access-policy-rules-create',
  templateUrl: './access-policy-rules-create.component.html',
  styleUrls: ['./access-policy-rules-create.component.scss']
})
export class AccessPolicyRulesCreateComponent extends RecordFormComponent<AccessPolicyRulesAppState, AccessPolicyRule, number, NgAccessPolicyRuleFormDependencies> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAccessPolicyRulesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAccessPolicyRulesFieldsConfig,
    public store: NgAccessPolicyRulesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
