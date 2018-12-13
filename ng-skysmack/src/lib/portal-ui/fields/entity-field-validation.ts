import { StrIndex } from '@skysmack/framework';
import { Validation } from '../forms/validation';

export class EntityFieldsValidation extends Validation {
    public formErrors = {
        key: '',
        type: '',
        display: '',
        validators: '',
        readPermissions: '',
        writePermissions: ''
    };

    public validationMessages: StrIndex<{}> = {
        key: {
            required: '',
        },
        type: {
            required: '',
        },
        display: {
            required: '',
        }
    };

    public area = 'field';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
