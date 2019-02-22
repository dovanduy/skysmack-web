import { StrIndex } from '@skysmack/framework';
import { Validation, CustomValidators } from '@skysmack/ng-ui';

export class NgUsersValidation extends Validation {
    public formErrors = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            invalidEmail: ''
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

    public area = 'users';

    public formValidators = [CustomValidators.comparePassword()];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
