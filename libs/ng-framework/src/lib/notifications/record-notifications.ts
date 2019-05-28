import { LocalObject, HttpErrorResponse, NumIndex, StrIndex } from '@skysmack/framework';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { Notifications } from './notifications';

export abstract class RecordNotifications<TRecord, TKey> {
    protected defaultTranslationString = 'NOTIFICATIONS.';

    protected GET_PAGED_ERROR = 'GET.PAGED_ERROR';
    protected GET_SINGLE_FAILURE = 'GET.SINGLE_FAILURE';
    protected ADD_SUCCESS = 'GETADD_SUCCESS';
    protected ADD_FAILURE = 'GET.ADD_FAILURE';
    protected UPDATE_SUCCESS = 'UPDATE.SUCCESS';
    protected UPDATE_FAILURE = 'UPDATE.FAILURE';
    protected REMOVE_SUCCESS = 'REMOVE.SUCCESS';
    protected REMOVE_FAILURE = 'REMOVE.FAILURE';
    protected CONNECTION_ERROR = 'CONNECTION_ERROR';

    constructor(public notifications: Notifications) { }

    public getBackendError(action: ReduxAction<HttpErrorResponse, any>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showSnackbarMessage(this.getErrorMessage(action), undefined, 2000);
        });
    }

    public getPagedError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.GET_PAGED_ERROR, this.getErrorParams(action), undefined, 2000);
        });
    }

    public getSingleError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.GET_SINGLE_FAILURE, this.getErrorParams(action), undefined, 2000);
        });
    }

    public addSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.ADD_SUCCESS, {}, undefined, 2000);
    }

    public addError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.ADD_FAILURE, this.getErrorParams(action), undefined, 2000);
        });
    }

    public updateSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.UPDATE_SUCCESS, {}, undefined, 2000);
    }

    public updateError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.UPDATE_FAILURE, this.getErrorParams(action), undefined, 2000);
        });
    }

    public removeSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.REMOVE_SUCCESS, {}, undefined, 2000);
    }

    public removeError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.REMOVE_FAILURE, this.getErrorParams(action), undefined, 2000);
        });
    }

    protected getErrorParams(action: ReduxAction<HttpErrorResponse, unknown>): StrIndex<any> {
        return {
            httpErrorCode: action.payload.status,
            // TODO: Replace this with backend custom error.
            errorMessage: 'An error occured'
        };
    }

    protected getErrorMessage(action: ReduxAction<HttpErrorResponse, unknown>): string {
        const validationErrors: StrIndex<string[]> = action.payload.error && action.payload.error.validationErrors;

        if (validationErrors) {
            const errors = Object.keys(validationErrors).reduce((acc, key) => acc.concat(validationErrors[key]), []).join(`,\n`);
            const errorMessage = `${errors} (${action.payload.status})`;
            return errorMessage;
        } else {
            return 'An error ocurred';
        }
    }

    protected checkOfflineStatus(action: ReduxAction<HttpErrorResponse, unknown>, ifOk: Function) {
        if (action.payload.status === 0) {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.CONNECTION_ERROR, this.getErrorParams(action), undefined, 2000);
        } else {
            ifOk();
        }
    }
}
