import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PASS_CODES_AREA_KEY } from '@skysmack/packages-pass-codes';

export class NgPersonsValidation extends Validation {
    public formErrors = {
        firstName: '',
        lastName: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        firstName: {
            required: '',
        },
        lastName: {
            required: '',
        },
        displayName: {
            required: '',
        }
    };

    public area = PASS_CODES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
