import { Terminal, TERMINALS_REDUCER_REDUX_KEY } from '@skysmack/packages-terminal-payments';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Injectable } from '@angular/core';
import { NgTerminalsRequests } from './ng-terminals-requests';
import { NgTerminalsNotifications } from '../ng-terminals-notifications';

@Injectable({ providedIn: 'root' })
export class TerminalsEpics extends RecordEpicsBase<Terminal, number> {
    constructor(protected requests: NgTerminalsRequests, protected notifications: NgTerminalsNotifications) {
        super(requests, TERMINALS_REDUCER_REDUX_KEY, notifications);
    }
}
