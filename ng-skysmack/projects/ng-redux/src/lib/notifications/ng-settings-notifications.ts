import { LocalObject, HttpErrorResponse, StrIndex } from '@skysmack/framework';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { Notifications } from './notifications';
import { Injectable, Inject } from '@angular/core';
import { NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgSettingsNotifications {
    protected defaultTranslationString = 'NOTIFICATIONS.';

    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { }

    public getError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, unknown>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.ERROR', this.getErrorParams(action), undefined, 2000);
        });
    }

    public updateSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<any, unknown>>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.SUCCESS', {}, undefined, 2000);
    }

    public updateError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, unknown>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    protected getErrorParams(action: ReduxAction<HttpErrorResponse, unknown>): StrIndex<any> {
        return {
            httpErrorCode: action.payload.status,
            // TODO: Replace this with backend custom error.
            errorMessage: 'An error occured'
        };
    }

    protected checkOfflineStatus(action: ReduxAction<HttpErrorResponse, unknown>, ifOk: Function) {
        if (action.payload.status === 0) {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'CONNECTION_ERROR', this.getErrorParams(action), undefined, 2000);
        } else {
            ifOk();
        }
    }
}
