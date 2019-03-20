import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { INVOICE_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices';

export class NgInvoicePaymentsValidation extends Validation {
    public formErrors = {
        description: '',
        source: '',
        amount: '',
        ip: '',
        inventoryId: ''
    };

    public validationMessages: StrIndex<{}> = {
        description: {
            required: ''
        },
        source: {
            required: ''
        },
        amount: {
            required: ''
        },
        ip: {
            required: ''
        },
        inventoryId: {
            required: ''
        }
    };

    public area = INVOICE_PAYMENTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
