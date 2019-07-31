import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { INVOICES_AREA_KEY } from '@skysmack/packages-invoices';

export class NgInvoicesValidation extends Validation {
    public formErrors = {
        currencyId: ''
    };

    public validationMessages: StrIndex<{}> = {
        currencyId: {
            required: ''
        }
    };

    public area = INVOICES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
