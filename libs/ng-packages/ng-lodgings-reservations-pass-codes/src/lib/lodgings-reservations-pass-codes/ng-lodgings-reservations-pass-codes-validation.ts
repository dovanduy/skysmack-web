import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { LODGINGS_RESERVATIONS_PASS_CODES_AREA_KEY } from './constants/constants';

export class NgLodgingsReservationsPassCodesValidation extends Validation {
    public formErrors = {
        lodgingReservationId: '',
        passCodeId: '',
    };

    public validationMessages: StrIndex<{}> = {
        lodgingReservationId: {
            required: ''
        },
        passCodeId: {
            required: ''
        }
    };

    public area = LODGINGS_RESERVATIONS_PASS_CODES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
