import { Injectable, Inject } from '@angular/core';
import { Notifications, RecordNotifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Phone } from '@skysmack/packages-phones';

@Injectable({ providedIn: 'root' })
export class NgPhonesNotifications extends RecordNotifications<Phone, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}

