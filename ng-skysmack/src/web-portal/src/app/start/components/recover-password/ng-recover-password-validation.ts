import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

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
