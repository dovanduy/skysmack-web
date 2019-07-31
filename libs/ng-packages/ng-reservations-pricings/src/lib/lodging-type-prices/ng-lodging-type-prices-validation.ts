import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { LODGING_TYPE_PRICES_AREA_KEY } from '@skysmack/packages-reservations-pricings';

export class NgLodgingTypePricesValidation extends Validation {
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

    public area = LODGING_TYPE_PRICES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
