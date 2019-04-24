import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccountAppState, AccountActions } from '@skysmack/packages-account';

@Injectable({ providedIn: 'root' })
export class NgAccountActions extends AccountActions<AccountAppState, NgRedux<AccountAppState>> {
    constructor(protected store: NgRedux<AccountAppState>) {
        super(store);
    }
}
