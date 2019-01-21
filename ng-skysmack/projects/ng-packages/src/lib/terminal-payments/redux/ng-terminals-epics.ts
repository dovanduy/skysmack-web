import { Terminal } from '@skysmack/packages-terminal-payments';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { Injectable } from '@angular/core';
import { NgTerminalsRequests } from './ng-terminals-requests';

@Injectable({ providedIn: 'root' })
export class TerminalsEpics extends DocumentRecordEpicsBase<Terminal, number> {
    constructor(protected requests: NgTerminalsRequests) {
        super(requests, 'TERMINALS_');
    }
}
