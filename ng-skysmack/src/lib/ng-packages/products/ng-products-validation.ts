import { StrIndex } from '@skysmack/framework';
import { RecordValidation } from 'lib/portal-ui/forms/record-validation';

export class ProductsValidation extends RecordValidation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
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
