import { Injectable, Inject } from '@angular/core';
import { Person } from '@skysmack/packages-persons';
import { RecordNotifications, Notifications } from '@skysmack/ng-redux';
import { ReduxAction, CommitMeta, RollbackMeta } from '@skysmack/redux';
import { LocalObject, FieldSchemaViewModel, HttpErrorResponse, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPersonsNotifications extends RecordNotifications<Person, number> {
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
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.FAILURE', this.getPersonErrorParams(action), undefined, 2000);
        });
    }

    public updateSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.SUCCESS', this.getPersonParams(action), undefined, 2000);
    }

    public updateError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Person, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.FAILURE', this.getPersonErrorParams(action), undefined, 2000);
        });
    }

    public removeSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.SUCCESS', this.getPersonParams(action), undefined, 2000);
    }

    public removeError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<Person, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.FAILURE', this.getPersonErrorParams(action), undefined, 2000);
        });
    }

    public getSingleFieldError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<FieldSchemaViewModel, string>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.SINGLE_FIELD_FAILURE', {
                0: action.meta.value.object.display
            }, undefined, 2000);
        });
    }

    protected getPersonParams(action: ReduxAction<unknown, CommitMeta<LocalObject<Person, number>[]>>): StrIndex<any> {
        return {
            displayName: action.meta.value[0].object.displayName
        };
    }

    protected getPersonErrorParams(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<Person, number>[]>>): StrIndex<any> {
        return {
            displayName: action.meta.value[0].object.display,
            httpError: action.payload.status
        };
    }
}
