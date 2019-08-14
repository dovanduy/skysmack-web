import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { TerminalPaymentReceipt, TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY } from '@skysmack/packages-terminal-payments';
import { NgTerminalPaymentReceiptsRequests } from './ng-terminal-payment-receipts-requests';
import { NgTerminalPaymentReceiptsNotifications } from '../ng-terminal-payment-receipts-notifications';


@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsEpics extends RecordEpicsBase<TerminalPaymentReceipt, number> {
    constructor(protected requests: NgTerminalPaymentReceiptsRequests, protected notifications: NgTerminalPaymentReceiptsNotifications) {
        super(requests, TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY, notifications);
    }
}
