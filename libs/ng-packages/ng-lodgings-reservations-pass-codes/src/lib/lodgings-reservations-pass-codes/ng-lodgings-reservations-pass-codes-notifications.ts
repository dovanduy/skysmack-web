import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { LodgingReservationPassCode, LodgingReservationPassCodeKey } from './models/lodging-reservation-pass-code';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsPassCodesNotifications extends RecordNotifications<LodgingReservationPassCode, LodgingReservationPassCodeKey> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
