import { StrIndex } from '@skysmack/framework';
import { Validation, CustomValidators } from '@skysmack/ng-ui';

export class SetPasswordValidation extends Validation {
    public formErrors = {
        password: '',
        confirmPassword: ''
    };

    public validationMessages: StrIndex<{}> = {
        password: {
            required: '',
            invalidPassword: ``
        },
        confirmPassword: {
            required: '',
            passwordMismatch: '',
        }
    };

    public area = 'users.setpassword';

    public formValidators = [CustomValidators.comparePassword()];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
