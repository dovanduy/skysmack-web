import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PHONE_NUMBERS_AREA_KEY } from '@skysmack/packages-phones';

export class NgPhoneNumbersValidation extends Validation {
    public formErrors = {
        number: '',
        internal: '',
        phoneId: '',
    };

    public validationMessages: StrIndex<{}> = {
        number: {
            required: ''
        },
        internal: {
            required: ''
        },
        phoneId: {
            required: ''
        }
    };

    public area = PHONE_NUMBERS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
