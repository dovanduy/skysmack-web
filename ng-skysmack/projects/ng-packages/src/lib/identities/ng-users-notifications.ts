import { Injectable, Inject } from '@angular/core';
import { Notifications, RecordNotifications } from '@skysmack/ng-redux';
import { User } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgUsersNotifications  extends RecordNotifications<User, number> {
    constructor(@Inject('Notifications') public notifications: Notifications)  { super(notifications); }
}

