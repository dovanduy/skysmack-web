import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { LODGING_TYPE_RESERVATION_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-reservations-pricings';

export class NgLodgingTypeReservationPriceChangesValidation extends Validation {
    public formErrors = {
        change: '',
        currencyCode: '',
        isPercentage: '',
        validFrom: '',
        validTo: '',
        recordId: '',
        start: '',
        end: '',
        minUnits: '',
        maxUnits: '',
        onlyValidUnits: '',
        minUnitsOfTime: '',
        maxUnitsOfTime: '',
        perUnit: '',
        onlyValidUnitsOfTime: '',
        perUnitOfTime: ''
    };

    public validationMessages: StrIndex<{}> = {
        change: {
            required: ''
        },
        currencyCode: {
            required: '',
        },
        isPercentage: {
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
        },
        minUnitsOfTime: {
            required: ''
        },
        maxUnitsOfTime: {
            required: ''
        },
        onlyValidUnitsOfTime: {
            required: ''
        },
        perUnitOfTime: {
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
