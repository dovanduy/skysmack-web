import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgRecoverPasswordValidation extends Validation {
 public formErrors = {
        token: '',
        password: '',
        confirmPassword: ''
    };

    public validationMessages: StrIndex<{}> = {
        token: {
            required: ''
        },
        password: {
            required: '',
            invalidPassword: ``
        },
        confirmPassword: {
            required: '',
            passwordMismatch: ''
        }
    };
    public area = 'UI';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
