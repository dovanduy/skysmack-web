import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class PackagesValidation extends Validation {
    public formErrors = {
        name: '',
        description: '',
        path: '',
        type: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        },
        description: {
            required: '',
        },
        path: {
            required: '',
            invalidStringLength: ''
        },
        type: {
            required: '',
            depsMissing: ''
        },
    };
    public area = 'packages';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
