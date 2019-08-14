import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { TerminalReceiptsAppState, TerminalReceipt, TERMINAL_RECEIPTS_REDUCER_KEY } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalReceiptsStore extends NgRecordStore<TerminalReceiptsAppState, TerminalReceipt, number> {
    constructor(
        protected ngRedux: NgRedux<TerminalReceiptsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, TERMINAL_RECEIPTS_REDUCER_KEY); }
}
