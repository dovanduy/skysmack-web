import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ClientsAppState, Client, CLIENTS_REDUCER_KEY } from '@skysmack/packages-terminal-payments';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgClientsStore extends NgRecordStore<ClientsAppState, Client, number> {
    constructor(
        protected ngRedux: NgRedux<ClientsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, CLIENTS_REDUCER_KEY); }
}
