import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { BASKETS_AREA_KEY } from '@skysmack/packages-baskets/lib/constants';

export class BasketsValidation extends Validation {
    public formErrors = {
        currencyCode: ''
    };

    public validationMessages: StrIndex<{}> = {
        currencyCode: {
            required: '',
        }
    };

    public area = BASKETS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
