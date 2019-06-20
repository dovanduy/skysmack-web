import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ConnectionsAppState, ConnectionKey, Connection, CONNECTIONS_REDUCER_KEY } from '@skysmack/packages-terminal-payments';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgConnectionsStore extends NgRecordStore<ConnectionsAppState, Connection, ConnectionKey> {
    constructor(
        protected ngRedux: NgRedux<ConnectionsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, CONNECTIONS_REDUCER_KEY); }
}
