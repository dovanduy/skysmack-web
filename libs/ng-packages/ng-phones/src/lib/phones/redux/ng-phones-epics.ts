import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Phone, PHONES_REDUX_KEY } from '@skysmack/packages-phones';
import { NgPhonesRequests } from './ng-phones-requests';
import { Injectable } from '@angular/core';
import { NgPhonesNotifications } from '../ng-phones-notifications';

@Injectable({ providedIn: 'root' })
export class NgPhonesEpics extends RecordEpicsBase<Phone, number> {
    constructor(protected requests: NgPhonesRequests, protected notifications: NgPhonesNotifications) {
        super(requests, PHONES_REDUX_KEY, notifications);
    }
}
