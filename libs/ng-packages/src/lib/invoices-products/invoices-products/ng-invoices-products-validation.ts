import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { INVOICES_PRODUCTS_AREA_KEY } from '@skysmack/packages-invoices-products';

export class NgInvoicesProductsValidation extends Validation {
    public formErrors = {
        invoiceId: '',
        productId: '',
        amount: ''
    };

    public validationMessages: StrIndex<{}> = {
        invoiceId: {
            required: ''
        },
        productId: {
            required: ''
        },
        amount: {
            required: ''
        }
    };

    public area = INVOICES_PRODUCTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
