import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { NgRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgUsersStore extends NgRecordReduxStore<UsersAppState, User, number> {
    constructor(protected ngRedux: NgRedux<UsersAppState>) { super(ngRedux, 'users'); }
}
