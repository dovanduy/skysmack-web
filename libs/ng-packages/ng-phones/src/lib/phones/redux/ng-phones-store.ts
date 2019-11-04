import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Phone, PhonesAppState, PHONES_REDUCER_KEY } from '@skysmack/packages-phones';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgPhonesStore extends NgRecordStore<PhonesAppState, Phone, number> {
    constructor(
        protected ngRedux: NgRedux<PhonesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PHONES_REDUCER_KEY); }
}
