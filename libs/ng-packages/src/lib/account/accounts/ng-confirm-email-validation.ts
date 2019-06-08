import { StrIndex } from '@skysmack/framework';
import { Validation, CustomValidators } from '@skysmack/ng-ui';
import { ACCOUNTS_AREA_KEY } from '@skysmack/packages-account';

export class NgConfirmEmailValidation extends Validation {
    public formErrors = {
        email: '',
        token: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
        },
        token: {
            required: '',
        }
    };

    public area = ACCOUNTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
