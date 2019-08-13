import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccessPolicyRolesAppState, AccessPolicyRolesActions, AccessPolicyRole, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesActions extends AccessPolicyRolesActions {
    constructor(protected store: NgRedux<AccessPolicyRolesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<AccessPolicyRole, AccessPolicyRoleKey>): StrIndex<string> {
        return {
            roleId: record.object.id.roleId.toString()
        };
    }
}
