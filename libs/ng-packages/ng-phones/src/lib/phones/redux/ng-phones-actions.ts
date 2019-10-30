import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PhonesAppState, PhonesActions } from '@skysmack/packages-phones';

@Injectable({ providedIn: 'root' })
export class NgPhonesActions extends PhonesActions {
    constructor(protected store: NgRedux<PhonesAppState>) {
        super(store);
    }
}
