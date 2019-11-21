import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { PassCode, PassCodesAppState, PASS_CODES_REDUCER_KEY } from '@skysmack/packages-pass-codes';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgPassCodesStore extends NgRecordStore<PassCodesAppState, PassCode, number> {
    constructor(
        protected ngRedux: NgRedux<PassCodesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PASS_CODES_REDUCER_KEY); }
}
