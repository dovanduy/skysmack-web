import { EntityValidation } from '../forms/entity-validation';
import { StrIndex } from '@skysmack/framework';

export class EntityFieldsValidation extends EntityValidation {
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
