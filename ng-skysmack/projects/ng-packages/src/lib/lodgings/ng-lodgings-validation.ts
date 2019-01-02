import { StrIndex } from '@skysmack/framework';
import { Validation } from 'lib/portal-ui/forms/validation';

export class LodgingsValidation extends Validation {
    public formErrors = {
        name: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = 'lodgings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
