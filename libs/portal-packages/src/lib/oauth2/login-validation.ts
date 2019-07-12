import { Validation } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class LoginValidation extends Validation {

    public formErrors = {
        email: '',
        password: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            invalidEmail: ''
        },
        password: {
            required: ''
        }
    };

    public area = 'OAUTH2';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
