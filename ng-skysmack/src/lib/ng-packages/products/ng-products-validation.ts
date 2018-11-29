import { StrIndex } from '@skysmack/framework';
import { RecordValidation } from 'lib/portal-ui/forms/record-validation';

export class ProductsValidation extends RecordValidation {
    public formErrors = {
        firstName: '',
        lastName: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        firstName: {
            required: '',
        },
        lastName: {
            required: '',
        },
        displayName: {
            required: '',
        }
    };

    public area = 'products';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
