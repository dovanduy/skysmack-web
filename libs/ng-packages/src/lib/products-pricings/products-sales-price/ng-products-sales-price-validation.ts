import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PRODUCTS_SALES_PRICE_AREA_KEY } from '@skysmack/packages-products-pricings';

export class NgProductsSalesPriceValidation extends Validation {
    public formErrors = {
        currencyCode: '',
        price: '',
        public: ''
    };

    public validationMessages: StrIndex<{}> = {
        currencyCode: {
            required: ''
        },
        price: {
            required: '',
        },
        recordId: {
            required: '',
        }
    };

    public area = PRODUCTS_SALES_PRICE_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
