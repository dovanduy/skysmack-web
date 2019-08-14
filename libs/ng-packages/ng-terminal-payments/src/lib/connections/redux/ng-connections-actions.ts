import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ConnectionsAppState, ConnectionsActions, Connection, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgConnectionsActions extends ConnectionsActions {
    constructor(protected store: NgRedux<ConnectionsAppState>) { super(store); }

    public getMessageParams(record: LocalObject<Connection, ConnectionKey>): StrIndex<string> {
        return {};
    }
}
