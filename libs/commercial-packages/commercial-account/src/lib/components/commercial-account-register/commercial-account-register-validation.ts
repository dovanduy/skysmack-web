import { Validation, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialAccountRegisterValidation extends Validation {

    public formErrors = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    public validationMessages: StrIndex<{}> = {
        userName: {
            required: ''
        },
        email: {
            required: '',
            invalidEmail: ''
        },
        password: {
            required: ''
        },
        confirmPassword: {
            required: '',
            passwordMismatch: ''
        }
    };

    public area = 'COMMERCIAL_ACCOUNT';

    public formValidators = [CustomValidators.comparePassword()];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
