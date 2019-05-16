import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { LODGING_RESERVATION_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-reservations-pricings';

export class NgLodgingReservationPriceChangesValidation extends Validation {
    public formErrors = {
        change: '',
        currencyCode: '',
        changeType: '',
        validFrom: '',
        validTo: '',
        recordId: '',
        start: '',
        end: '',
        minUnits: '',
        maxUnits: '',
        changeIncludesAllUnits: '',
        minUnitsOfTime: '',
        maxUnitsOfTime: '',
        changeIncludeAllUnitsOfTime: '',
        perUnitOfTime: ''
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
        },
        minUnits: {
            required: ''
        },
        maxUnits: {
            required: ''
        },
        changeIncludesAllUnits: {
            required: ''
        },
        minUnitsOfTime: {
            required: ''
        },
        maxUnitsOfTime: {
            required: ''
        },
        changeIncludeAllUnitsOfTime: {
            required: ''
        },
        perUnitOfTime: {
            required: ''
        }
    };

    public area = LODGING_RESERVATION_PRICE_CHANGES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
