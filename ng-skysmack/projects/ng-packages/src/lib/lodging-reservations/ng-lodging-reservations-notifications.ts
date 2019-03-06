import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsNotifications extends RecordNotifications<LodgingReservation, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
