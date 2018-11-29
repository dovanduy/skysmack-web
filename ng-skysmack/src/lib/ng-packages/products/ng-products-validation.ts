import { StrIndex } from '@skysmack/framework';
import { RecordValidation } from 'lib/portal-ui/forms/record-validation';

export class ProductsValidation extends RecordValidation {
    public formErrors = {
        name: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
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
