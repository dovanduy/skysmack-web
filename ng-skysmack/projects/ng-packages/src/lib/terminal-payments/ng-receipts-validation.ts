import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class ReceiptsValidation extends Validation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = 'receipts';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
