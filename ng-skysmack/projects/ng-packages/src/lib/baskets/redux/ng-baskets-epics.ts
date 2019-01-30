import { NgBasketsRequests } from './ng-baskets-requests';
import { Basket } from '@skysmack/packages-baskets';
import { Injectable } from '@angular/core';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { NgBasketsNotifications } from '../ng-baskets-notifications';


@Injectable({ providedIn: 'root' })
export class NgBasketsEpics extends DocumentRecordEpicsBase<Basket, number> {
    constructor(protected requests: NgBasketsRequests, protected notifications: NgBasketsNotifications) {
        super(requests, 'BASKETS_', notifications);
    }
}
