import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ClientsAppState, ClientsActions } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgClientsActions extends ClientsActions {
    constructor(protected store: NgRedux<ClientsAppState>) {
        super(store);
    }
}
