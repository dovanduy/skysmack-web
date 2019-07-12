import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRulesActions, NgAccessPolicyRulesStore } from '../../../../../../../ng-packages/ng-access-policies/src/lib';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { AccessPolicyRulesAppState, AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRulesFieldsConfig } from '../../ng-access-policy-rules-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-access-policy-rules-edit',
  templateUrl: './access-policy-rules-edit.component.html'
})
export class AccessPolicyRulesEditComponent extends RecordFormComponent<AccessPolicyRulesAppState, AccessPolicyRule, number> implements OnInit {

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
    this.setEditFields();
  }
}
