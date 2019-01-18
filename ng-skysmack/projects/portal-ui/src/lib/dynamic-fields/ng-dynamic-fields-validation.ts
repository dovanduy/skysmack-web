import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class DynamicFieldsValidation extends Validation {
    public formErrors = {
        key: '',
        type: '',
        display: '',
        validators: '',
        readPermission: '',
        writePermission: ''
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

    public area = 'fields';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
