import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { TERMINAL_PAYMENT_RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';

export class NgTerminalPaymentReceiptsValidation extends Validation {
    public formErrors = {
        referenceNumber: '',
        printReceipt: '',
        receiptDocument: '',
        invoicePaymentId: ''
    };

    public validationMessages: StrIndex<{}> = {
        referenceNumber: {
            required: ''
        },
        printReceipt: {
            required: ''
        },
        receiptDocument: {
            required: ''
        },
        invoicePaymentId: {}
    };

    public area = TERMINAL_PAYMENT_RECEIPTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
