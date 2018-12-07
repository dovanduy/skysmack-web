import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AuthenticationAppState, AuthenticationActions } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class NgOauth2Actions extends AuthenticationActions<AuthenticationAppState, NgRedux<AuthenticationAppState>>  {

    constructor(
        public store: NgRedux<AuthenticationAppState>,
    ) {
        super(store);
    }
}
