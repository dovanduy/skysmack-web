import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class PersonsValidation extends Validation {
    public formErrors = {
        firstName: '',
        lastName: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        firstName: {
            required: '',
        },
        lastName: {
            required: '',
        },
        displayName: {
            required: '',
        }
    };

    public area = 'persons';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
