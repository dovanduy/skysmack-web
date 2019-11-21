import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PASS_CODES_AREA_KEY } from '@skysmack/packages-pass-codes';

export class NgPassCodesValidation extends Validation {
    public formErrors = {
        code: '',
        description: ''
    };

    public validationMessages: StrIndex<{}> = {
        firstName: {
            required: ''
        },
        description: {
            required: ''
        }
    };

    public area = PASS_CODES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
