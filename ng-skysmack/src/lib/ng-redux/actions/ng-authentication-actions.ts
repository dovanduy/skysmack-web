import { Injectable } from '@angular/core';
import { AuthenticationActions, AuthenticationAppState } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';

@Injectable({ providedIn: 'root' })
export class NgAuthenticationActions extends AuthenticationActions<AuthenticationAppState, NgRedux<AuthenticationAppState>>  {
    constructor(
        public store: NgRedux<AuthenticationAppState>,
    ) {
        super(store);
    }
}
