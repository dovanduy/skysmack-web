import { StrIndex } from '@skysmack/framework';
import { RecordValidation } from '../forms/record-validation';

export class EntityFieldsValidation extends RecordValidation {
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
