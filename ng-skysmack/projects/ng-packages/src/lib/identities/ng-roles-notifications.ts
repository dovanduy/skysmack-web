import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { Role } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgRolesNotifications extends RecordNotifications<Role, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
