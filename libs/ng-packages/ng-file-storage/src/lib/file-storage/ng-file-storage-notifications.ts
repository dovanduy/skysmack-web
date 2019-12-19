import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { LocalObject, HttpErrorResponse } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgFileStorageNotifications extends RecordNotifications<unknown, unknown> {
    public defaultTranslationString = 'FILE_STORAGE.NOTIFICATIONS.';

    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) {
        super(notifications);
    }

    public removeError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<unknown, unknown>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.REMOVE_FAILURE, this.getErrorParams(action), undefined, 2000);
        });
    }
}
