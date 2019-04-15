import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

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

    public area = 'UI';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
