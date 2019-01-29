import { MatSnackBar } from '@angular/material';
import { RecordNotifications } from './record-notifications';
import { HttpErrorResponse, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { ReduxAction, CommitMeta } from '@skysmack/redux';

export abstract class DocumentRecordNotifications<TRecord, TKey> extends RecordNotifications<TRecord, TKey> {
    constructor(
        public snackBar: MatSnackBar
    ) { super(snackBar); }

    // GET
    protected toStringGetFieldsError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }
    protected toStringGetSingleFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }

    // ADD
    protected toStringAddFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>): string {
        return `${action.meta.value.map(field => field.object.display).join(', ')} was created successfully`;
    }
    protected toStringAddFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }

    // UPDATE
    protected toStringUpdateFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>): string {
        return `${action.meta.value.map(field => field.object.display).join(', ')} was created successfully`;
    }
    protected toStringUpdateFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }

    // DELETE
    protected toStringRemoveFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>): string {
        return `${action.meta.value.map(field => field.object.display).join(', ')} was removed successfully`;
    }
    protected toStringRemoveFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>): string {
        return `You recieved an ${action.payload.status} error code.`;
    }

    public getFieldsError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.showSnackbarMessage(this.toStringGetFieldsError(action), undefined, 5000);
    }
    public getSingleFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>) {
        this.showSnackbarMessage(this.toStringGetSingleFieldError(action), undefined, 5000);
    }

    public addFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.showSnackbarMessage(this.toStringAddFieldSuccess(action));
    }
    public addFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.showSnackbarMessage(this.toStringAddFieldError(action), undefined, 5000);
    }

    public updateFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.showSnackbarMessage(this.toStringUpdateFieldSuccess(action));
    }
    public updateFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.showSnackbarMessage(this.toStringUpdateFieldError(action), undefined, 5000);
    }

    public removeFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.showSnackbarMessage(this.toStringRemoveFieldSuccess(action));
    }
    public removeFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.showSnackbarMessage(this.toStringRemoveFieldError(action), undefined, 5000);
    }
}
