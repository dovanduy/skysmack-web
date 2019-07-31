import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { LODGING_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';

export class NgLodgingReservationsValidation extends Validation {
    public formErrors = {
        lodgingTypeId: '',
        allocatedLodgingId: '',
        checkIn: '',
        checkOut: '',
        stays: '',
        status: '',
        persons: ''
    };

    public validationMessages: StrIndex<{}> = {
        lodgingTypeId: {
            required: ''
        },
        checkIn: {
            required: '',
        },
        checkOut: {
            required: '',
        },
        stays: {
            required: '',
        },
        status: {
            required: '',
        },
        persons: {
            required: '',
        }
    };

    public area = LODGING_RESERVATIONS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
