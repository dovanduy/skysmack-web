import { Validation } from '@skysmack/ng-ui'; ';
import { StrIndex } from '@skysmack/framework';

export class LoginValidation extends Validation {

    public formErrors = {
        email: '',
        password: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            email: ''
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
