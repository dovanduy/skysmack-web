import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { TerminalReceiptsAppState, TERMINAL_RECEIPTS_REDUX_KEY, TERMINAL_RECEIPTS_ADDITIONAL_PATHS, TerminalReceipt } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalReceiptsActions extends RecordActionsBase<TerminalReceiptsAppState, NgRedux<TerminalReceiptsAppState>> {
    constructor(protected store: NgRedux<TerminalReceiptsAppState>) { super(store, TERMINAL_RECEIPTS_REDUX_KEY, TERMINAL_RECEIPTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<TerminalReceipt, number>): StrIndex<string> {
        return {
            printReceipt: record.object.printReceipt
        };
    }
}
