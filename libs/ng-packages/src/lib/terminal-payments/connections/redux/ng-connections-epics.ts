import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { Connection, CONNECTIONS_REDUX_KEY, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { Injectable } from '@angular/core';
import { NgConnectionsRequests } from './ng-connections-requests';
import { NgConnectionsNotifications } from '../ng-connections-notifications';
import { NgClientsStore } from '../../clients/redux/ng-clients-store';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgClientsActions } from '../../clients/redux/ng-clients-actions';
import { NgTerminalsStore } from '../../terminals/redux/ng-terminals-store';
import { NgTerminalsActions } from '../../terminals/redux/ng-terminals-actions';

@Injectable({ providedIn: 'root' })
export class ConnectionsEpics extends RecordEpicsBase<Connection, ConnectionKey> {
    constructor(
        protected requests: NgConnectionsRequests,
        protected notifications: NgConnectionsNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected clientsStore: NgClientsStore,
        protected clientsActions: NgClientsActions,
        protected terminalsStore: NgTerminalsStore,
        protected terminalsActions: NgTerminalsActions
    ) {
        super(requests, CONNECTIONS_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: CONNECTIONS_REDUX_KEY,
                relationIdSelector: 'id.clientId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.clientsStore,
                actions: this.clientsActions
            }),
            ...getReadDependencies({
                prefix: CONNECTIONS_REDUX_KEY,
                relationIdSelector: 'id.terminalId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.terminalsStore,
                actions: this.terminalsActions
            })
        ]);
    }
}
