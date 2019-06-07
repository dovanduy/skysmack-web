import { Package } from '@skysmack/framework';
import { Injectable, Inject } from '@angular/core';
import { Notifications, NOTIFICATIONS_INJECTOR_TOKEN, RecordNotifications } from '@skysmack/ng-framework';


@Injectable({ providedIn: 'root' })
export class NgPackagesNotifications extends RecordNotifications<Package, string> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}

