import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { LODGING_TYPE_RESERVATION_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-reservations-pricings';

export class NgLodgingTypeReservationPriceChangesValidation extends Validation {
    public formErrors = {
        change: '',
        currencyCode: '',
        changeType: '',
        validFrom: '',
        validTo: '',
        recordId: '',
        start: '',
        end: ''
    };

    public validationMessages: StrIndex<{}> = {
        change: {
            required: ''
        },
        currencyCode: {
            required: '',
        },
        changeType: {
            required: '',
        },
        recordId: {
            required: '',
        },
        start: {
            required: '',
        },
        end: {
            required: ''
        }
    };

    public area = LODGING_TYPE_RESERVATION_PRICE_CHANGES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
