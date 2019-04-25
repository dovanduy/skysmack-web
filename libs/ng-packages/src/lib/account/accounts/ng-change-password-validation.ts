import { StrIndex } from '@skysmack/framework';
import { Validation, CustomValidators } from '@skysmack/ng-ui';
import { ACCOUNTS_AREA_KEY } from '@skysmack/packages-account';

export class NgChangePasswordValidation extends Validation {
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

    public area = ACCOUNTS_AREA_KEY;

    public formValidators = [CustomValidators.comparePassword('newPassword', 'confirmNewPassword')];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
