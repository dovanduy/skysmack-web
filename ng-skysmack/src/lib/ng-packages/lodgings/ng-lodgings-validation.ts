import { StrIndex } from '@skysmack/framework';
import { RecordValidation } from 'lib/portal-ui/forms/record-validation';

export class LodgingsValidation extends RecordValidation {
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
