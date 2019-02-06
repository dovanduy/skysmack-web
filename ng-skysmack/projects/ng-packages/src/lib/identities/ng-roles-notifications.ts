import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Role } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgRolesNotifications extends DocumentRecordNotifications<Role, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
