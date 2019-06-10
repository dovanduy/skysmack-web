import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { UsersAppState, UsersActions } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgUsersActions extends UsersActions {
    constructor(protected store: NgRedux<UsersAppState>) {
        super(store);
    }
}
