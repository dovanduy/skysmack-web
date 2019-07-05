import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-products-pricings';

export class NgProductTypePriceChangesValidation extends Validation {
    public formErrors = {
        currencyCode: '',
        change: '',
        isPercent: '',
        validFrom: '',
        validTo: '',
        recordId: '',
        minUnits: '',
        maxUnits: '',
        perUnit: '',
        onlyValidUnits: ''
    };

    public validationMessages: StrIndex<{}> = {
        currencyCode: {
            required: ''
        },
        change: {
            required: ''
        },
        isPercent: {
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
        },
        minUnits: {
            required: ''
        },
        maxUnits: {
            required: ''
        },
        perUnit: {
            required: ''
        },
        onlyValidUnits: {
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
