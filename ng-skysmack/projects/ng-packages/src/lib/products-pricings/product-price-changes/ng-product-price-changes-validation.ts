import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { PRODUCT_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-products-pricings';

export class NgProductPriceChangesValidation extends Validation {
    public formErrors = {
        currencyCode: '',
        change: '',
        changeType: '',
        validFrom: '',
        validTo: '',
        recordId: ''
    };

    public validationMessages: StrIndex<{}> = {
        currencyCode: {
            required: ''
        },
        change: {
            required: '',
        },
        changeType: {
            required: '',
        },
        validFrom: {
            required: '',
        },
        validTo: {
            required: '',
        },
        recordId: {
            required: '',
        }
    };

    public area = PRODUCT_PRICE_CHANGES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
