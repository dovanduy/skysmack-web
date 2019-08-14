import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { TerminalPaymentReceiptsAppState, TerminalPaymentReceipt, TERMINAL_PAYMENT_RECEIPTS_REDUCER_KEY } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsStore extends NgRecordStore<TerminalPaymentReceiptsAppState, TerminalPaymentReceipt, number> {
    constructor(
        protected ngRedux: NgRedux<TerminalPaymentReceiptsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, TERMINAL_PAYMENT_RECEIPTS_REDUCER_KEY); }
}
