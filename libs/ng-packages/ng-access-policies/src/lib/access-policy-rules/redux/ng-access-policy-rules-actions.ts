import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccessPolicyRulesAppState, AccessPolicyRulesActions, AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesActions extends AccessPolicyRulesActions {
    constructor(protected store: NgRedux<AccessPolicyRulesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<AccessPolicyRule, number>): StrIndex<string> {
        return {};
    }
}
