import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';
import { Receipt } from './../models/receipt';

export class ReceiptsEpics extends DocumentRecordEpicsBase<Receipt, number> {
    constructor(protected requests: DocumentRecordRequests<Receipt, number>) {
        super(requests, 'RECEIPTS_');
    }
}
