import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgFromToValidation extends Validation {
    public formErrors = {
        from: '',
        to: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        from: {
            required: '',
        },
        to: {
            required: '',
        }
    };

    public area = 'MAINTENANCE';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
