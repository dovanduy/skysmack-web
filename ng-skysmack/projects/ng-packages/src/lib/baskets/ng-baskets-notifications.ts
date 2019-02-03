import { Injectable, Inject } from '@angular/core';
import { Basket } from '@skysmack/packages-baskets';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgBasketsNotifications extends DocumentRecordNotifications<Basket, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}