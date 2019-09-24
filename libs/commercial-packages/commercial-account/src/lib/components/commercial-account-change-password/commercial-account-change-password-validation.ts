import { StrIndex } from '@skysmack/framework';
import { Validation, CustomValidators } from '@skysmack/ng-dynamic-forms';

export class CommercialAccountChangePasswordValidation extends Validation {
    public formErrors = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    public validationMessages: StrIndex<{}> = {
        currentPassword: {
            required: '',
        },
        newPassword: {
            required: '',
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
