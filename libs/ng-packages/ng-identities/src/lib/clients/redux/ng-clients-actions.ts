import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { ClientsActions, ClientsAppState, Client } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgClientsActions extends ClientsActions {
    constructor(protected store: NgRedux<ClientsAppState>) { super(store); }

    public getMessageParams(record: LocalObject<Client, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}
