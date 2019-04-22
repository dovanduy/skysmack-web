import { StrIndex } from '@skysmack/framework';
import { Validation, CustomValidators } from '@skysmack/ng-ui';
import { USERS_AREA_KEY } from '@skysmack/packages-identities';

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

    public area = USERS_AREA_KEY;

    public formValidators = [CustomValidators.comparePassword()];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
