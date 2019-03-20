import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RolesAppState, Role, ROLES_REDUX_KEY, ROLES_AREA_KEY, ROLES_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgRolesActions extends RecordActionsBase<RolesAppState, NgRedux<RolesAppState>> {
    constructor(protected store: NgRedux<RolesAppState>) { super(store, ROLES_REDUX_KEY, ROLES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Role, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}
