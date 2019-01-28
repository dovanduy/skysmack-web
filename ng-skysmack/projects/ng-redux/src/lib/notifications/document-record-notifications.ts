import { MatSnackBar } from '@angular/material';
import { RecordNotifications } from './record-notifications';
import { HttpErrorResponse, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';

export abstract class DocumentRecordNotifications<TRecord, TKey> extends RecordNotifications<TRecord, TKey> {
    constructor(
        public snackBar: MatSnackBar
    ) { super(snackBar); }

    protected toStringAddFieldSuccess(value: LocalObject<FieldSchemaViewModel, string>[]): string {
        return `${value.map(field => field.object.display).join(', ')} was created successfully`;
    }
    protected toStringAddFieldError(error: HttpErrorResponse): string {
        return `An error happened`;
    }

    protected toStringUpdateFieldSuccess(value: LocalObject<FieldSchemaViewModel, string>[]): string {
        return `${value.map(field => field.object.display).join(', ')} was created successfully`;
    }
    protected toStringUpdateFieldError(error: HttpErrorResponse): string {
        return `An error happened`;
    }

    protected toStringRemoveFieldSuccess(value: LocalObject<FieldSchemaViewModel, string>[]): string {
        return `${value.map(field => field.object.display).join(', ')} was removed successfully`;
    }
    protected toStringRemoveFieldError(error: HttpErrorResponse): string {
        return `An error happened`;
    }

    public addFieldSuccess(value: LocalObject<FieldSchemaViewModel, string>[]) {
        this.showSnackbarMessage(this.toStringAddFieldSuccess(value));
    }
    public addFieldError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringAddFieldError(error));
    }

    public updateFieldSuccess(value: LocalObject<FieldSchemaViewModel, string>[]) {
        this.showSnackbarMessage(this.toStringUpdateFieldSuccess(value));
    }
    public updateFieldError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringUpdateFieldError(error));
    }

    public removeFieldSuccess(value: LocalObject<FieldSchemaViewModel, string>[]) {
        this.showSnackbarMessage(this.toStringRemoveFieldSuccess(value));
    }
    public removeFieldError(error: HttpErrorResponse) {
        this.showSnackbarMessage(this.toStringRemoveFieldError(error));
    }
}
