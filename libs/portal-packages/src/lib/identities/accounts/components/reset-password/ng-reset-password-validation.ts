import { StrIndex } from '@skysmack/framework';
import { Validation, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { ACCOUNTS_AREA_KEY } from '@skysmack/packages-identities'

export class NgResetPasswordValidation extends Validation {
    public formErrors = {
        email: '',
        token: '',
        password: '',
        confirmPassword: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            invalidEmail: ''
        },
        token: {
            required: ''
        },
        newPassword: {
            required: '',
            invalidPassword: ``
        },
        confirmNewPassword: {
            required: '',
            passwordMismatch: ''
        }
    };

    public area = ACCOUNTS_AREA_KEY;

    public formValidators = [CustomValidators.comparePassword('newPassword', 'confirmNewPassword')];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
