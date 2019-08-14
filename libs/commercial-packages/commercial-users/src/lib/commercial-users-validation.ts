import { Validation, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialUsersValidation extends Validation {

    public formErrors = {
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            invalidEmail: ''
        },
        userName: {
            required: ''
        },
        password: {
            required: '',
        },
        confirmPassword: {
            required: '',
            passwordMismatch: ''
        }
    };

    public area = 'COMMERCIAL_USERS';

    public formValidators = [CustomValidators.comparePassword()];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
