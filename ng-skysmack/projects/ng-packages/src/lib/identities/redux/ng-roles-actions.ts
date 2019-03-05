import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RolesAppState, Role } from '@skysmack/packages-identities';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgRolesActions extends RecordActionsBase<RolesAppState, NgRedux<RolesAppState>> {
    constructor(protected store: NgRedux<RolesAppState>) { super(store, 'ROLES_', ['roles']); }

    public getMessageParams(record: LocalObject<Role, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}
