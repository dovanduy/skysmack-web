import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { TerminalPaymentReceiptsAppState, TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY, TERMINAL_PAYMENT_RECEIPTS_ADDITIONAL_PATHS, TerminalPaymentReceipt } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsActions extends RecordActionsBase<TerminalPaymentReceiptsAppState, NgRedux<TerminalPaymentReceiptsAppState>> {
    constructor(protected store: NgRedux<TerminalPaymentReceiptsAppState>) { super(store, TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY, TERMINAL_PAYMENT_RECEIPTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<TerminalPaymentReceipt, number>): StrIndex<string> {
        return {
            displayName: record.object.displayName
        };
    }
}
