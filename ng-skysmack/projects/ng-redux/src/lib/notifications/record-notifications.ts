import { NotificationsBase } from './notifications-base';
import { MatSnackBar } from '@angular/material';
import { LocalObject, HttpErrorResponse } from '@skysmack/framework';

export abstract class RecordNotifications<TRecord, TKey> extends NotificationsBase {

    constructor(
        public snackBar: MatSnackBar
    ) { super(snackBar); }

    // GET
    protected toStringGetPagedError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }
    protected toStringGetSingleError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }

    // ADD
    protected toStringAddSuccess(value: LocalObject<TRecord, TKey>[]): string {
        return `Entity was created successfully`;
    }
    protected toStringAddError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }

    // UPDATE
    protected toStringUpdateSuccess(value: LocalObject<TRecord, TKey>[]): string {
        return `Entity was updated successfully`;
    }
    protected toStringUpdateError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }

    // DELETE
    protected toStringRemoveSuccess(value: LocalObject<TRecord, TKey>[]): string {
        return `Entity was removed successfully`;
    }
    protected toStringRemoveError(error: HttpErrorResponse): string {
        return `You recieved an ${error.status} error code.`;
    }

    public getPagedError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringGetPagedError(error), undefined, 5000);
    }
    public getSingleError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringGetSingleError(error), undefined, 5000);
    }

    public addSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringAddSuccess(value));
    }
    public addError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringAddError(error), undefined, 5000);
    }

    public updateSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringUpdateSuccess(value));
    }
    public updateError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringUpdateError(error), undefined, 5000);
    }

    public removeSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringRemoveSuccess(value));
    }
    public removeError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringRemoveError(error), undefined, 5000);
    }
}
