import { Injectable, Inject } from '@angular/core';
import { RecordNotifications, Notifications, NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { ReduxAction, CommitMeta, RollbackMeta } from '@skysmack/redux';
import { LocalObject, FieldSchemaViewModel, HttpErrorResponse, StrIndex } from '@skysmack/framework';
import { TerminalPaymentReceipt } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsNotifications extends RecordNotifications<TerminalPaymentReceipt, number> {
    public defaultTranslationString = 'TERMINAL_PAYMENT_RECEIPTS.NOTIFICATIONS.';

    constructor(@Inject(NOTIFICATIONS_INJECTOR_TOKEN) public notifications: Notifications) { super(notifications); }

    public getPagedError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TerminalPaymentReceipt, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.GET_PAGED_ERROR, this.getErrorParams(action), undefined, 2000);
        });
    }

    public getSingleError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TerminalPaymentReceipt, number>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.GET_SINGLE_FAILURE, this.getErrorParams(action), undefined, 2000);
        });
    }

    public addSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TerminalPaymentReceipt, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.ADD_SUCCESS, this.getTerminalPaymentReceiptParams(action), undefined, 2000);
    }

    public addError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TerminalPaymentReceipt, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.ADD_FAILURE, this.getTerminalPaymentReceiptErrorParams(action), undefined, 2000);
        });
    }

    public updateSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TerminalPaymentReceipt, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.UPDATE_SUCCESS, this.getTerminalPaymentReceiptParams(action), undefined, 2000);
    }

    public updateError(action: ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TerminalPaymentReceipt, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.UPDATE_FAILURE, this.getTerminalPaymentReceiptErrorParams(action), undefined, 2000);
        });
    }

    public removeSuccess(action: ReduxAction<unknown, CommitMeta<LocalObject<TerminalPaymentReceipt, number>[]>>) {
        this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.REMOVE_SUCCESS, this.getTerminalPaymentReceiptParams(action), undefined, 2000);
    }

    public removeError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<TerminalPaymentReceipt, number>[]>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + this.REMOVE_FAILURE, this.getTerminalPaymentReceiptErrorParams(action), undefined, 2000);
        });
    }

    public getSingleFieldError(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<FieldSchemaViewModel, string>>>) {
        this.checkOfflineStatus(action, () => {
            this.notifications.showTranslatedSnackbarMessage(this.defaultTranslationString + 'GET.SINGLE_FIELD_FAILURE', {
                0: action.meta.value.object.display
            }, undefined, 2000);
        });
    }

    protected getTerminalPaymentReceiptParams(action: ReduxAction<unknown, CommitMeta<LocalObject<TerminalPaymentReceipt, number>[]>>): StrIndex<any> {
        return {
            displayName: action.meta.value[0].object.referenceNumber
        };
    }

    protected getTerminalPaymentReceiptErrorParams(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<TerminalPaymentReceipt, number>[]>>): StrIndex<any> {
        return {
            displayName: action.meta.value[0].object.referenceNumber,
            httpErrorCode: action.payload.status
        };
    }
}
