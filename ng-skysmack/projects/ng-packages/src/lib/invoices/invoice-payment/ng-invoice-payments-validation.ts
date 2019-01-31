import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

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

    public area = 'invoice_payments';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
