import { NotificationsBase } from './notifications-base';
import { MatSnackBar } from '@angular/material';
import { LocalObject, HttpErrorResponse } from '@skysmack/framework';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { TranslateService } from '@ngx-translate/core';

export abstract class RecordNotifications<TRecord, TKey> extends NotificationsBase {

    protected defaultTranslationString = 'NOTIFICATIONS.';

    constructor(
        public snackBar: MatSnackBar,
        public translateService: TranslateService,
        public translationPrefix: string
    ) { super(snackBar, translateService, translationPrefix); }

    // GET
    protected toStringGetPagedError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }
    protected toStringGetSingleError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }

    // ADD
    // protected toStringAddSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>): string {
    //     return `Entity was created successfully`;
    // }
    protected toStringAddError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }

    // UPDATE
    protected toStringUpdateSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>): string {
        return `Entity was updated successfully`;
    }
    protected toStringUpdateError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }

    // DELETE
    protected toStringRemoveSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>): string {
        return `Entity was removed successfully`;
    }
    protected toStringRemoveError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }

    public getPagedError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.showSnackbarMessage(this.toStringGetPagedError(action), undefined, 5000);
    }
    public getSingleError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>>>) {
        this.showSnackbarMessage(this.toStringGetSingleError(action), undefined, 5000);
    }

    public addSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.SUCCESS', {}, undefined, 2000);
    }
    public addError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.showSnackbarMessage(this.toStringAddError(action), undefined, 5000);
    }

    public updateSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        // REFACTOR
        this.showSnackbarMessage(this.toStringUpdateSuccess(action));
    }
    public updateError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.showSnackbarMessage(this.toStringUpdateError(action), undefined, 5000);
    }

    public removeSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        // REFACTOR
        this.showSnackbarMessage(this.toStringRemoveSuccess(action));
    }
    public removeError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>) {
        this.showSnackbarMessage(this.toStringRemoveError(action), undefined, 5000);
    }
}
