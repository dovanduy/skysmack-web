import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { UsersAppState } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgUsersActions extends RecordActionsBase<UsersAppState, NgRedux<UsersAppState>> {
    constructor(protected store: NgRedux<UsersAppState>) { super(store, 'USERS_', ['users']); }
}
