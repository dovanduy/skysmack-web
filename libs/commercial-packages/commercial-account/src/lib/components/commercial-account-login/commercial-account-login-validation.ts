import { Validation } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialAccountLoginValidation extends Validation {

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

    public area = 'COMMERCIAL_ACCOUNT';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
