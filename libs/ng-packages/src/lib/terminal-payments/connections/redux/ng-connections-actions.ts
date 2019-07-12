import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ConnectionsAppState, ConnectionsActions } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgConnectionsActions extends ConnectionsActions {
    constructor(protected store: NgRedux<ConnectionsAppState>) { super(store); }
}
