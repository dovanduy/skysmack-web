import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { ACCOUNTS_AREA_KEY } from '@skysmack/packages-identities';

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

    public area = ACCOUNTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
