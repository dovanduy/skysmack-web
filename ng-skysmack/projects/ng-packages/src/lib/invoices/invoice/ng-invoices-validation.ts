import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class NgInvoicesValidation extends Validation {
    public formErrors = {
        currencyId: ''
    };

    public validationMessages: StrIndex<{}> = {
        currencyId: {
            required: ''
        }
    };

    public area = 'invoices';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
