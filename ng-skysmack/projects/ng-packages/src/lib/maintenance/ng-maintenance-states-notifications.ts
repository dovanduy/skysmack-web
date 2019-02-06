import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { MaintenanceState } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesNotifications extends DocumentRecordNotifications<MaintenanceState, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
