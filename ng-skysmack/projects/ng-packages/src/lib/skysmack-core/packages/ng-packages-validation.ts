import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

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
            required: ''
        },
    };
    public area = 'packages';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
