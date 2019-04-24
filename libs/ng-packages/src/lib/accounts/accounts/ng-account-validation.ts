import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { ACCOUNT_AREA_KEY } from '@skysmack/packages-account';

export class NgAccountValidation extends Validation {
    public formErrors = {
        email: '',
        password: '',
        repeatPassword: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
        },
        password: {
            required: '',
        },
        repeatPassword: {
            required: '',
            mustMatch: ''
        }
    };

    public area = ACCOUNT_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
