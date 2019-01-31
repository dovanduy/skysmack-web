import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class InvoiceItemsValidation extends Validation {
    public formErrors = {
        description: '',
        order: '',
        units: '',
        unitPrice: '',
        unitDiscount: '',
        unitTax: '',
        inventoryId: ''
    };

    public validationMessages: StrIndex<{}> = {
        description: {
            required: ''
        },
        order: {
            required: ''
        },
        units: {
            required: ''
        },
        unitPrice: {
            required: ''
        },
        unitDiscount: {
            required: ''
        },
        unitTax: {
            required: ''
        },
        inventoryId: {
            required: ''
        }
    };

    public area = 'invoice_items';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
