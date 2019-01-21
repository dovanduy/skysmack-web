import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

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

    public area = 'lodging_reservations';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
