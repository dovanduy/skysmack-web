import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PhoneLogsAppState, PhoneLogsActions } from '@skysmack/packages-phones';

@Injectable({ providedIn: 'root' })
export class NgPhoneLogsActions extends PhoneLogsActions {
    constructor(protected store: NgRedux<PhoneLogsAppState>) {
        super(store);
    }
}
