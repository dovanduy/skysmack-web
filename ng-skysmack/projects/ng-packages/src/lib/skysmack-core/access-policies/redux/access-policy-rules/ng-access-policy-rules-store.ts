import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { AccessPolicyRulesAppState, AccessPolicyRule, ACCESS_POLICY_RULES_AREA_KEY } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesStore extends NgRecordStore<AccessPolicyRulesAppState, AccessPolicyRule, number> {
    constructor(protected ngRedux: NgRedux<AccessPolicyRulesAppState>) { super(ngRedux, ACCESS_POLICY_RULES_AREA_KEY); }
}
