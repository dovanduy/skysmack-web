import { StrIndex } from '@skysmack/framework';
import { Validation } from 'lib/portal-ui/forms/validation';

export class ProductsValidation extends Validation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = 'products';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
