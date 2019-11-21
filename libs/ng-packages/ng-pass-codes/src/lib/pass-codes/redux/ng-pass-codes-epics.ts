import { NgPersonsRequests } from './ng-pass-codes-requests';
import { Person, PASS_CODES_REDUX_KEY } from '@skysmack/packages-pass-codes';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgPersonsNotifications } from '../ng-pass-codes-notifications';


@Injectable({ providedIn: 'root' })
export class NgPersonsEpics extends RecordEpicsBase<Person, number> {
    constructor(protected requests: NgPersonsRequests, protected notifications: NgPersonsNotifications) {
        super(requests, PASS_CODES_REDUX_KEY, notifications);
    }
}
