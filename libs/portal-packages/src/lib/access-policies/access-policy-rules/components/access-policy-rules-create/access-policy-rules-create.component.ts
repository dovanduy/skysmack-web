import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { AccessPolicyRulesAppState, AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRulesFieldsConfig } from '../../ng-access-policy-rules-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgAccessPolicyRulesActions, NgAccessPolicyRulesStore } from '@skysmack/ng-access-policies';

@Component({
  selector: 'ss-access-policy-rules-create',
  templateUrl: './access-policy-rules-create.component.html'
})
export class AccessPolicyRulesCreateComponent extends RecordFormComponent<AccessPolicyRulesAppState, AccessPolicyRule, number> implements OnInit {
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
