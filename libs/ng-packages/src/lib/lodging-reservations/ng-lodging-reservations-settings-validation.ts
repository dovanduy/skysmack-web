import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgLodgingReservationsSettingsValidation extends Validation {
    public formErrors = {
        earliestCheckIn: '',
        latestCheckOut: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'lodging_reservations_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
