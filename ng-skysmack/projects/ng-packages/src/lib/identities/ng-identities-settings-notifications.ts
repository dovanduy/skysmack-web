import { Injectable, Inject } from '@angular/core';
import { Notifications } from '@skysmack/ng-redux';
import { IdentitiesSettings } from '@skysmack/packages-identities';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { HttpErrorResponse, LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesSettingsNotifications {
    protected defaultTranslationString = 'NOTIFICATIONS.';

    constructor(@Inject('Notifications') public notifications: Notifications) { }

    public getError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<IdentitiesSettings, unknown>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.ERROR', this.getErrorParams(action), undefined, 2000);
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

