import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { LodgingReservationPriceChange } from '@skysmack/packages-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationPriceChangesNotifications extends RecordNotifications<LodgingReservationPriceChange, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
