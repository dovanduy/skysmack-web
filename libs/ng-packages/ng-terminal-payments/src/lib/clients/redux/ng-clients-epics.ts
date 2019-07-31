import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Client, CLIENTS_REDUX_KEY } from '@skysmack/packages-terminal-payments';
import { Injectable } from '@angular/core';
import { NgClientsRequests } from './ng-clients-requests';
import { NgClientsNotifications } from '../ng-clients-notifications';

@Injectable({ providedIn: 'root' })
export class ClientsEpics extends RecordEpicsBase<Client, number> {
    constructor(protected requests: NgClientsRequests, protected notifications: NgClientsNotifications) {
        super(requests, CLIENTS_REDUX_KEY, notifications);
    }
}
