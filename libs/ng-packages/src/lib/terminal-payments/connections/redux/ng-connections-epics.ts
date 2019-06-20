import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Connection, CONNECTIONS_REDUX_KEY, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { Injectable } from '@angular/core';
import { NgConnectionsRequests } from './ng-connections-requests';
import { NgConnectionsNotifications } from '../ng-connections-notifications';

@Injectable({ providedIn: 'root' })
export class ConnectionsEpics extends RecordEpicsBase<Connection, ConnectionKey> {
    constructor(protected requests: NgConnectionsRequests, protected notifications: NgConnectionsNotifications) {
        super(requests, CONNECTIONS_REDUX_KEY, notifications);
    }
}
