import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { Connection, CONNECTIONS_REDUX_KEY, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { Injectable } from '@angular/core';
import { NgConnectionsRequests } from './ng-connections-requests';
import { NgConnectionsNotifications } from '../ng-connections-notifications';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgTerminalsStore } from '../../terminals/redux/ng-terminals-store';
import { NgTerminalsActions } from '../../terminals/redux/ng-terminals-actions';
import { NgClientsStore, NgClientsActions } from '@skysmack/ng-identities';

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
                actions: this.clientsActions,
                dependencyIndexes: [0]
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
