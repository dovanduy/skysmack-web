import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { AccessPolicyRulesAppState, AccessPolicyRule } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesStore extends NgRecordReduxStore<AccessPolicyRulesAppState, AccessPolicyRule, number> {
    constructor(protected ngRedux: NgRedux<AccessPolicyRulesAppState>) { super(ngRedux, 'accessPolicyRules'); }
}
