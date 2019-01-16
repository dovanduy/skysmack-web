import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class LodgingReservationsValidation extends Validation {
    public formErrors = {
        lodgingTypeId: '',
        allocatedLodgingId: '',
        checkIn: '',
        checkOut: '',
        stays: '',
        reservationStatus: '',
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
        reservationStatus: {
            required: '',
        }
    };

    public area = 'lodging-reservations';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
