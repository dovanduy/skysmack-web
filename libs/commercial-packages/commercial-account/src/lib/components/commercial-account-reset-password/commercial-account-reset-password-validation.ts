import { Validation, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialAccountResetPasswordValidation extends Validation {

    public formErrors = {
        email: '',
        token: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            invalidEmail: ''
        },
        token: {
            required: '',
        },
        newPassword: {
            required: '',
            invalidPassword: ''
        },
        confirmNewPassword: {
            required: '',
            passwordMismatch: ''
        }
    };

    public area = 'COMMERCIAL_ACCOUNT';

    public formValidators = [CustomValidators.comparePassword('newPassword', 'confirmNewPassword')];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
