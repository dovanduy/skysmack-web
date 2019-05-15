import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Receipt, RECEIPTS_REDUX_KEY } from '@skysmack/packages-terminal-payments';
import { Injectable } from '@angular/core';
import { NgReceiptsRequests } from './ng-receipts-requests';
import { NgReceiptsNotifications } from '../ng-receipts-notifications';

@Injectable({ providedIn: 'root' })
export class ReceiptsEpics extends RecordEpicsBase<Receipt, number> {
    constructor(protected requests: NgReceiptsRequests, protected notifications: NgReceiptsNotifications) {
        super(requests, RECEIPTS_REDUX_KEY, notifications);
    }
}
