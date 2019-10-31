import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PhoneNumbersAppState, PhoneNumbersActions } from '@skysmack/packages-phones';

@Injectable({ providedIn: 'root' })
export class NgPhoneNumbersActions extends PhoneNumbersActions {
    constructor(protected store: NgRedux<PhoneNumbersAppState>) {
        super(store);
    }
}
