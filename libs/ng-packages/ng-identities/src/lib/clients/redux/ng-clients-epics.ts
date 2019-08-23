import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Injectable } from '@angular/core';
import { NgClientsRequests } from './ng-clients-requests';
import { NgClientsNotifications } from '../ng-clients-notifications';
import { Client, CLIENTS_REDUX_KEY } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class ClientsEpics extends RecordEpicsBase<Client, string> {
    constructor(protected requests: NgClientsRequests, protected notifications: NgClientsNotifications) {
        super(requests, CLIENTS_REDUX_KEY, notifications);
    }
}
