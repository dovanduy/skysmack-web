import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { TerminalReceipt, TERMINAL_RECEIPTS_REDUX_KEY } from '@skysmack/packages-terminal-payments';
import { NgTerminalReceiptsRequests } from './ng-terminal-receipts-requests';
import { NgTerminalReceiptsNotifications } from '../ng-terminal-receipts-notifications';


@Injectable({ providedIn: 'root' })
export class NgTerminalReceiptsEpics extends RecordEpicsBase<TerminalReceipt, number> {
    constructor(protected requests: NgTerminalReceiptsRequests, protected notifications: NgTerminalReceiptsNotifications) {
        super(requests, TERMINAL_RECEIPTS_REDUX_KEY, notifications);
    }
}
