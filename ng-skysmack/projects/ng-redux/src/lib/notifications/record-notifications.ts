import { NotificationsBase } from './notifications-base';
import { MatSnackBar } from '@angular/material';
import { LocalObject, HttpErrorResponse } from '@skysmack/framework';

export abstract class RecordNotifications<TRecord, TKey> extends NotificationsBase {

    constructor(
        public snackBar: MatSnackBar
    ) { super(snackBar); }

    protected abstract toStringAddSuccess(value: LocalObject<TRecord, TKey>[]): string;
    protected abstract toStringAddError(error: HttpErrorResponse): string;

    protected abstract toStringUpdateSuccess(value: LocalObject<TRecord, TKey>[]): string;
    protected abstract toStringUpdateError(error: HttpErrorResponse): string;

    protected abstract toStringRemoveSuccess(value: LocalObject<TRecord, TKey>[]): string;
    protected abstract toStringRemoveError(error: HttpErrorResponse): string;

    public addSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringAddSuccess(value));
    }
    public addError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringAddError(error));
    }

    public updateSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringUpdateSuccess(value));
    }
    public updateError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringUpdateError(error));
    }

    public removeSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringRemoveSuccess(value));
    }
    public removeError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringRemoveError(error));
    }
}
