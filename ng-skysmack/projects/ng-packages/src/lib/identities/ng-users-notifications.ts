import { Injectable, Inject } from '@angular/core';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { User } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgUsersNotifications extends DocumentRecordNotifications<User, number> {
    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }
}
