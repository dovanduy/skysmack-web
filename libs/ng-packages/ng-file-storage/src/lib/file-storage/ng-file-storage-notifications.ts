import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgFileStorageNotifications {
    public defaultTranslationString = 'FILE_STORAGE.NOTIFICATIONS.';

    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { }
}
