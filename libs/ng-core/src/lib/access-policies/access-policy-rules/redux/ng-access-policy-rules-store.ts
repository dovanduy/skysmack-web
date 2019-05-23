import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { AccessPolicyRulesAppState, AccessPolicyRule, ACCESS_POLICY_RULES_REDUCER_KEY } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '../../../skysmack/redux/ng-skysmack-store';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesStore extends NgRecordStore<AccessPolicyRulesAppState, AccessPolicyRule, number> {
    constructor(
        protected ngRedux: NgRedux<AccessPolicyRulesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ACCESS_POLICY_RULES_REDUCER_KEY); }
}
