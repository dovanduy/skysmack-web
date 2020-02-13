import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { Definition } from '@skysmack/packages-workflows';

@Injectable({ providedIn: 'root' })
export class NgDefinitionsNotifications extends RecordNotifications<Definition, number> {
    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }
}
