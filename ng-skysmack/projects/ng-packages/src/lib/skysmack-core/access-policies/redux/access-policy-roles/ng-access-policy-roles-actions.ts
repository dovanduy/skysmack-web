import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccessPolicyRolesAppState, AccessPolicyRolesActions } from '@skysmack/packages-skysmack-core';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesActions extends AccessPolicyRolesActions {
    constructor(protected store: NgRedux<AccessPolicyRolesAppState>) { super(store); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}
