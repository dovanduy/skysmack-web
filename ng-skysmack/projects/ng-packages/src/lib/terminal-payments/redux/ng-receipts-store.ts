import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ReceiptsAppState, Receipt, RECEIPTS_REDUCER_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgReceiptsStore extends NgRecordStore<ReceiptsAppState, Receipt, number> {
    constructor(protected ngRedux: NgRedux<ReceiptsAppState>) { super(ngRedux, RECEIPTS_REDUCER_AREA_KEY); }
}
