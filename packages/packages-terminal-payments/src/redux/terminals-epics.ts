import { Terminal } from '../models/index';
import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';

export class TerminalsEpics extends DocumentRecordEpicsBase<Terminal, number> {
    constructor(protected requests: DocumentRecordRequests<Terminal, number>) {
        super(requests, 'TERMINALS_');
    }
}
