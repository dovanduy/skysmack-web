import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { INVOICE_ITEMS_AREA_KEY } from '@skysmack/packages-invoices';

export class NgInvoiceItemsValidation extends Validation {
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

    public area = INVOICE_ITEMS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
