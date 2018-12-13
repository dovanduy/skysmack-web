import { StrIndex } from '@skysmack/framework';
import { Validation } from 'lib/portal-ui/forms/validation';

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
