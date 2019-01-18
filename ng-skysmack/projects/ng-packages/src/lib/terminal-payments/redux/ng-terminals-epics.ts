import { Terminal } from '@skysmack/packages-terminal-payments';
import { DocumentRecordRequests } from '@skysmack/redux';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';

export class TerminalsEpics extends DocumentRecordEpicsBase<Terminal, number> {
    constructor(protected requests: DocumentRecordRequests<Terminal, number>) {
        super(requests, 'TERMINALS_');
    }
}
