import { RecordNotifications } from './record-notifications';
import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { ReduxAction, CommitMeta } from '@skysmack/redux';
import { Notifications } from './notifications';

export abstract class DocumentRecordNotifications<TRecord, TKey> extends RecordNotifications<TRecord, TKey> {
    constructor(public notifications: Notifications) { super(notifications); }

    public getFieldsError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.FIELDS_FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public getSingleFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.SINGLE_FIELD_FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public addFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.FIELD_SUCCESS', {}, undefined, 2000);
    }

    public addFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'ADD.FIELD_FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public updateFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.FIELD_SUCCESS', {}, undefined, 2000);
    }

    public updateFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'UPDATE.FIELD_FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }

    public removeFieldSuccess(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.FIELD_SUCCESS', {}, undefined, 2000);
    }

    public removeFieldError(action: ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'REMOVE.FIELD_FAILURE', this.getErrorParams(action), undefined, 2000);
        });
    }
}
