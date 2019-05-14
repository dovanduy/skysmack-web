import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ReceiptsAppState, Receipt, RECEIPTS_REDUCER_KEY } from '@skysmack/packages-terminal-payments';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgReceiptsStore extends NgRecordStore<ReceiptsAppState, Receipt, number> {
    constructor(
        protected ngRedux: NgRedux<ReceiptsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, RECEIPTS_REDUCER_KEY); }
}
