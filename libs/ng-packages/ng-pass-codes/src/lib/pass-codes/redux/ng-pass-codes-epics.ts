import { NgPassCodesRequests } from './ng-pass-codes-requests';
import { PassCode, PASS_CODES_REDUX_KEY } from '@skysmack/packages-pass-codes';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgPassCodesNotifications } from '../ng-pass-codes-notifications';


@Injectable({ providedIn: 'root' })
export class NgPassCodesEpics extends RecordEpicsBase<PassCode, number> {
    constructor(protected requests: NgPassCodesRequests, protected notifications: NgPassCodesNotifications) {
        super(requests, PASS_CODES_REDUX_KEY, notifications);
    }
}
