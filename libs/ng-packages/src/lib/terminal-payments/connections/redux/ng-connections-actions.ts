import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ConnectionsAppState, Connection, CONNECTIONS_REDUX_KEY, CONNECTIONS_ADDITIONAL_PATHS, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgConnectionsActions extends RecordActionsBase<ConnectionsAppState, NgRedux<ConnectionsAppState>> {
    constructor(protected store: NgRedux<ConnectionsAppState>) { super(store, CONNECTIONS_REDUX_KEY, CONNECTIONS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Connection, ConnectionKey>): StrIndex<string> {
        return {
            id: 'Object'
        };
    }
}
