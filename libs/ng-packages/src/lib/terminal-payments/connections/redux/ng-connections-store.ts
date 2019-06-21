import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ConnectionsAppState, ConnectionKey, Connection, CONNECTIONS_REDUCER_KEY } from '@skysmack/packages-terminal-payments';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgConnectionsStore extends NgRecordStore<ConnectionsAppState, Connection, ConnectionKey> {

    private deps = [
        new DependencyOptions({
            relationSelector: 'client',
            relationIdSelector: 'id.clientId',
            stateSelector: 'clients'
        }),
        new DependencyOptions({
            relationSelector: 'terminal',
            relationIdSelector: 'id.terminalId',
            stateSelector: 'terminals'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<ConnectionsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, CONNECTIONS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<Connection, ConnectionKey>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: ConnectionKey): Observable<LocalObject<Connection, ConnectionKey>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
