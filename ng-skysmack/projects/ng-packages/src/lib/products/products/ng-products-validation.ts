import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { PRODUCTS_AREA_KEY } from '@skysmack/packages-products';

export class NgProductsValidation extends Validation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = PRODUCTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
