import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ConnectionsAppState, ConnectionKey, Connection, CONNECTIONS_REDUCER_KEY } from '@skysmack/packages-terminal-payments';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DependencyOptions, LocalObject, hasValue } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgConnectionsStore extends NgRecordStore<ConnectionsAppState, Connection, ConnectionKey> {

    private deps = [
        new DependencyOptions({
            relationSelector: 'client',
            relationIdSelector: 'id.clientId',
            stateSelector: 'clients',
            dependencyIndexes: [0]
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


    protected getSingleRecord(packagePath: string, id: ConnectionKey): Observable<LocalObject<Connection, ConnectionKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => {
                const clientIdMatch = record.object.id.clientId === id.clientId;
                const terminalIdMatch = record.object.id.terminalId === id.terminalId;
                return (clientIdMatch && terminalIdMatch) ? true : false;
            })),
            hasValue()
        );
    }
}
