import { StrIndex } from '@skysmack/framework';
import { RecordValidation } from 'lib/portal-ui/forms/record-validation';

export class ProductTypesValidation extends RecordValidation {
    public formErrors = {
        name: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = 'product-types';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
