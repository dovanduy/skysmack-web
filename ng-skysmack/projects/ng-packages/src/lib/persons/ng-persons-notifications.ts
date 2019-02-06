import { Injectable, Inject } from '@angular/core';
import { Person } from '@skysmack/packages-persons';
import { DocumentRecordNotifications, Notifications } from '@skysmack/ng-redux';
import { ReduxAction, CommitMeta, RollbackMeta } from '@skysmack/redux';
import { LocalObject, FieldSchemaViewModel, HttpErrorResponse, NumIndex, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends DocumentRecordNotifications<Person, number> {
public defaultTranslationString = 'PERSONS.NOTIFICATIONS.';

    constructor(@Inject('Notifications') public notifications: Notifications) { super(notifications); }

    public getPagedError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Person, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.PAGED_ERROR', this.getErrorParams(action), undefined, 2000);
        });
    }

    public getSingleError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Person, number>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.SINGLE_FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public addSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.SUCCESS', this.getPersonParams(action), undefined, 2000);
    }

    public addError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Person, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public updateSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.SUCCESS', this.getPersonParams(action), undefined, 2000);
    }

    public updateError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Person, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public removeSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.SUCCESS', this.getPersonParams(action), undefined, 2000);
    }

    public removeError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<Person, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public getFieldsError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.FIELDS_FAILURE', this.getPersonFieldParams(action), undefined, 2000);
        });
    }

    public getSingleFieldError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<FieldSchemaViewModel, string>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.SINGLE_FIELD_FAILURE', {
                0: action.meta.value.object.display
            }, undefined, 2000);
        });
    }

    public addFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.FIELD_SUCCESS', this.getPersonFieldParams(action), undefined, 2000);
    }

    public addFieldError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.FIELD_FAILURE', this.getPersonFieldParams(action), undefined, 2000);
        });
    }

    public updateFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.FIELD_SUCCESS', this.getPersonFieldParams(action), undefined, 2000);
    }

    public updateFieldError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.FIELD_FAILURE', this.getPersonFieldParams(action), undefined, 2000);
        });
    }

    public removeFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.FIELD_SUCCESS', this.getPersonFieldParams(action), undefined, 2000);
    }

    public removeFieldError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.FIELD_FAILURE', this.getPersonFieldParams(action), undefined, 2000);
        });
    }

    protected getPersonParams(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>): NumIndex<any> {
        return {
            0: action.payload.status,
            // TODO: Replace this with backend custom error.
            1: action.meta.value[0].object.displayName
        };
    }

    protected getPersonFieldParams(action: ReduxAction<unknown, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>): StrIndex<any> {
        return {
            0: action.payload.status,
            // TODO: Replace this with backend custom error.
            1: action.meta.value[0].object.display
        };
    }
}
