import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

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
