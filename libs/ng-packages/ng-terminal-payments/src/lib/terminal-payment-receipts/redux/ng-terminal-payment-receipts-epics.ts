import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { TerminalPaymentReceipt, TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY } from '@skysmack/packages-terminal-payments';
import { NgTerminalPaymentReceiptsRequests } from './ng-terminal-payment-receipts-requests';
import { NgTerminalPaymentReceiptsNotifications } from '../ng-terminal-payment-receipts-notifications';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgTerminalPaymentReceiptsStore } from './ng-terminal-payment-receipts-store';
import { NgTerminalPaymentReceiptsActions } from './ng-terminal-payment-receipts-actions';


@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsEpics extends RecordEpicsBase<TerminalPaymentReceipt, number> {
    constructor(
        protected requests: NgTerminalPaymentReceiptsRequests, 
        protected notifications: NgTerminalPaymentReceiptsNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected TerminalPaymentReceiptsStore: NgTerminalPaymentReceiptsStore,
        protected TerminalPaymentReceiptsActions: NgTerminalPaymentReceiptsActions
    ) {
        super(requests, TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: TERMINAL_PAYMENT_RECEIPTS_REDUX_KEY,
                relationIdSelector: 'InvoicePaymentId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.TerminalPaymentReceiptsStore,
                actions: this.TerminalPaymentReceiptsActions,
                dependencyIndexes: [0]
            })
        ]);
    }
}
