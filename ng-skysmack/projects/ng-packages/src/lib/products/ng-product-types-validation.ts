import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class ProductTypesValidation extends Validation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = 'product_types';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
