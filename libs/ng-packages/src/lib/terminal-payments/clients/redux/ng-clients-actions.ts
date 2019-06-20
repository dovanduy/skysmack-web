import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ClientsAppState, Client, CLIENTS_REDUX_KEY, CLIENTS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgClientsActions extends RecordActionsBase<ClientsAppState, NgRedux<ClientsAppState>> {
    constructor(protected store: NgRedux<ClientsAppState>) { super(store, CLIENTS_REDUX_KEY, CLIENTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Client, number>): StrIndex<string> {
        return {
            id: 'Object'
        };
    }
}
