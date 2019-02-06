import { Terminal } from '@skysmack/packages-terminal-payments';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { Injectable } from '@angular/core';
import { NgTerminalsRequests } from './ng-terminals-requests';
import { NgTerminalsNotifications } from '../ng-terminals-notifications';

@Injectable({ providedIn: 'root' })
export class TerminalsEpics extends DocumentRecordEpicsBase<Terminal, number> {
    constructor(protected requests: NgTerminalsRequests, protected notifications: NgTerminalsNotifications) {
        super(requests, 'TERMINALS_', notifications);
    }
}
