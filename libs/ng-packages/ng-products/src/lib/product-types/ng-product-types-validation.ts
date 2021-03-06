import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PRODUCT_TYPES_AREA_KEY } from '@skysmack/packages-products';

export class NgProductTypesValidation extends Validation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = PRODUCT_TYPES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
