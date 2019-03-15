import { LocalObject, HttpErrorResponse, StrIndex, FieldSchemaViewModel } from '@skysmack/framework';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { Notifications } from './notifications';
import { Injectable, Inject } from '@angular/core';
import { NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgFieldNotifications {
    protected defaultTranslationString = 'NOTIFICATIONS.';

    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { }

    public getPagedError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.PAGED_ERROR', this.getErrorParams(action), undefined, 2000);
        });
    }

    public getSingleError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.SINGLE_FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public getAvailableFieldsFailure(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.AVAILABLE_FIELDS_FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public addSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.SUCCESS', {}, undefined, 2000);
    }

    public addError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public updateSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.SUCCESS', {}, undefined, 2000);
    }

    public updateError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public removeSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.SUCCESS', {}, undefined, 2000);
    }

    public removeError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.FAILURE', this.getErrorParams(action), undefined, 2000);
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
