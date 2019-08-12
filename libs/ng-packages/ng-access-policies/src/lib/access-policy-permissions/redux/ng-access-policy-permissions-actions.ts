import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccessPolicyPermissionsAppState, AccessPolicyPermissionsActions, AccessPolicyPermission } from '@skysmack/packages-skysmack-core';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsActions extends AccessPolicyPermissionsActions {
    constructor(protected store: NgRedux<AccessPolicyPermissionsAppState>) { super(store); }

    public getMessageParams(record: LocalObject<AccessPolicyPermission, number>): StrIndex<string> {
        return {
            id: record.object.id.toString()
        };
    }
}
