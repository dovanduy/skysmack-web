import { Validation } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialAccountForgotPasswordValidation extends Validation {

    public formErrors = {
        email: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            invalidEmail: ''
        }
    };

    public area = 'OAUTH2';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
