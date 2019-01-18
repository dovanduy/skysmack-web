import { DocumentRecordRequests } from '@skysmack/redux';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { Receipt } from '@skysmack/packages-terminal-payments';

export class ReceiptsEpics extends DocumentRecordEpicsBase<Receipt, number> {
    constructor(protected requests: DocumentRecordRequests<Receipt, number>) {
        super(requests, 'RECEIPTS_');
    }
}
