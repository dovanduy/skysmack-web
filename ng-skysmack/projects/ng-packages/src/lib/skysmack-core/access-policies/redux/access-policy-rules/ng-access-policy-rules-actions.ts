import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccessPolicyRulesAppState, AccessPolicyRulesActions } from '@skysmack/packages-skysmack-core';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesActions extends AccessPolicyRulesActions {
    constructor(protected store: NgRedux<AccessPolicyRulesAppState>) { super(store); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}
