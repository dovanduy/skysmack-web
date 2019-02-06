import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { Receipt } from '@skysmack/packages-terminal-payments';
import { Injectable } from '@angular/core';
import { NgReceiptsRequests } from './ng-receipts-requests';
import { NgReceiptsNotifications } from '../ng-receipts-notifications';

@Injectable({ providedIn: 'root' })
export class ReceiptsEpics extends DocumentRecordEpicsBase<Receipt, number> {
    constructor(protected requests: NgReceiptsRequests, protected notifications: NgReceiptsNotifications) {
        super(requests, 'RECEIPTS_', notifications);
    }
}
