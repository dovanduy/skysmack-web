import { NgBasketsRequests } from './ng-baskets-requests';
import { Basket, BASKETS_REDUX_KEY } from '@skysmack/packages-baskets';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { NgBasketsNotifications } from '../ng-baskets-notifications';


@Injectable({ providedIn: 'root' })
export class NgBasketsEpics extends RecordEpicsBase<Basket, number> {
    constructor(protected requests: NgBasketsRequests, protected notifications: NgBasketsNotifications) {
        super(requests, BASKETS_REDUX_KEY, notifications);
    }
}
