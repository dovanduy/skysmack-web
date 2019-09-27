import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgGroupReservationsNotifications } from '../ng-group-reservations-notifications';
import { GroupReservation, GROUP_RESERVATIONS_REDUX_KEY } from '@skysmack/packages-lodging-reservations';
import { NgGroupReservationsRequests } from './ng-group-reservations-requests';

@Injectable({ providedIn: 'root' })
export class NgGroupReservationsEpics extends RecordEpicsBase<GroupReservation, number> {
    constructor(protected requests: NgGroupReservationsRequests, protected notifications: NgGroupReservationsNotifications) {
        super(requests, GROUP_RESERVATIONS_REDUX_KEY, notifications);
    }
}