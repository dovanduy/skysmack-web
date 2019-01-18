import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RolesAppState } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgRolesActions extends RecordActionsBase<RolesAppState, NgRedux<RolesAppState>> {
    constructor(protected store: NgRedux<RolesAppState>) { super(store, 'ROLES_', ['roles']); }
}
