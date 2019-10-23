import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { ACCOUNT_AREA_KEY } from '@skysmack/packages-identities';

export class NgForgotPasswordValidation extends Validation {
    public formErrors = {
        email: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            invalidEmail: ''
        }
    };

    public area = ACCOUNT_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
