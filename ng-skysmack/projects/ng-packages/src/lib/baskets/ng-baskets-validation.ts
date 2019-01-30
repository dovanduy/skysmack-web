import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class BasketsValidation extends Validation {
    public formErrors = {
        currencyCode: ''
    };

    public validationMessages: StrIndex<{}> = {
        currencyCode: {
            required: '',
        }
    };

    public area = 'baskets';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
