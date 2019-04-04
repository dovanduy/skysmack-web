import { Component, OnInit } from '@angular/core';
import { NgAccessPolicyRulesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAccessPolicyRulesStore } from '@skysmack/ng-packages';
import { AccessPolicyRulesAppState, AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { NgAccessPolicyRulesFieldsConfig } from '../../ng-access-policy-rules-fields-config';

@Component({
  selector: 'ss-access-policy-rules-edit',
  templateUrl: './access-policy-rules-edit.component.html',
  styleUrls: ['./access-policy-rules-edit.component.scss']
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
