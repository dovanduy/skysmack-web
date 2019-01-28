import { NotificationsBase } from './notifications-base';
import { MatSnackBar } from '@angular/material';
import { LocalObject } from '@skysmack/framework';

export abstract class RecordNotifications<TRecord, TKey> extends NotificationsBase {

    constructor(
        public snackBar: MatSnackBar
    ) { super(snackBar); }

    protected abstract toStringAddSuccess(value: LocalObject<TRecord, TKey>[]): string;
    protected abstract toStringAddError(value: LocalObject<TRecord, TKey>[]): string;

    protected abstract toStringUpdateSuccess(value: LocalObject<TRecord, TKey>[]): string;
    protected abstract toStringUpdateError(value: LocalObject<TRecord, TKey>[]): string;

    protected abstract toStringRemoveSuccess(value: LocalObject<TRecord, TKey>[]): string;
    protected abstract toStringRemoveError(value: LocalObject<TRecord, TKey>[]): string;

    public addSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringAddSuccess(value));
    }
    public addError(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringAddError(value));
    }

    public updateSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringUpdateSuccess(value));
    }
    public updateError(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringUpdateError(value));
    }

    public removeSuccess(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringRemoveSuccess(value));
    }
    public removeError(value: LocalObject<TRecord, TKey>[]) {
        this.showSnackbarMessage(this.toStringRemoveError(value));
    }
}
