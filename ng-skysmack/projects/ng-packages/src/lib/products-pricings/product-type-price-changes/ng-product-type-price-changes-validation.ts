import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-products-pricings';

export class NgProductTypePriceChangesValidation extends Validation {
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
            required: ''
        },
        changeType: {
            required: ''
        },
        validFrom: {
            required: ''
        },
        validTo: {
            required: ''
        },
        recordId: {
            required: ''
        }
    };

    public area = PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
