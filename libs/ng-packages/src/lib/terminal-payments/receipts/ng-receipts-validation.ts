import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';


export class NgReceiptsValidation extends Validation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = RECEIPTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
