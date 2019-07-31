import { NgPersonsRequests } from './ng-persons-requests';
import { Person, PERSONS_REDUX_KEY } from '@skysmack/packages-persons';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgPersonsNotifications } from '../ng-persons-notifications';


@Injectable({ providedIn: 'root' })
export class NgPersonsEpics extends RecordEpicsBase<Person, number> {
    constructor(protected requests: NgPersonsRequests, protected notifications: NgPersonsNotifications) {
        super(requests, PERSONS_REDUX_KEY, notifications);
    }
}
