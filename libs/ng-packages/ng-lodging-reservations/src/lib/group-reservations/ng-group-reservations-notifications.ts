import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { GroupReservation } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgGroupReservationsNotifications extends RecordNotifications<GroupReservation, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
