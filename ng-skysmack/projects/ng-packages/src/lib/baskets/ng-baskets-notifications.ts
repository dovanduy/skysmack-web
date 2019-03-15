import { Injectable, Inject } from '@angular/core';
import { Basket } from '@skysmack/packages-baskets';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgBasketsNotifications extends RecordNotifications<Basket, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
