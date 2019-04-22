import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class NgVerifyEmailValidation extends Validation {
    public formErrors = {
        token: ''
    };

    public validationMessages: StrIndex<{}> = {
        token: {
            required: ''
        }
    };

    public area = 'UI';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
