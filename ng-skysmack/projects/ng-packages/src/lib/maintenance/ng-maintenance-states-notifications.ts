import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { MaintenanceState } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesNotifications extends RecordNotifications<MaintenanceState, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
