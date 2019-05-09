import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { INVOICES_CASH_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices-cash-payments';

export class NgInvoicesCashPaymentsValidation extends Validation {
    public formErrors = {
        description: '',
        currencyCode: '',
        amount: '',
        invoiceId: ''
    };

    public validationMessages: StrIndex<{}> = {
        description: {
            required: ''
        },
        currencyCode: {
            required: ''
        },
        amount: {
            required: ''
        },
        invoiceId: {
            required: ''
        }
    };

    public area = INVOICES_CASH_PAYMENTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
