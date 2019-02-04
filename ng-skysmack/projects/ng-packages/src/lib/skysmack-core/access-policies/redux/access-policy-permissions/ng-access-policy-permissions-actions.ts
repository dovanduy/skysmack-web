import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccessPolicyPermissionsAppState, AccessPolicyPermissionsActions } from '@skysmack/packages-skysmack-core';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsActions extends AccessPolicyPermissionsActions {
    constructor(protected store: NgRedux<AccessPolicyPermissionsAppState>) { super(store); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}
