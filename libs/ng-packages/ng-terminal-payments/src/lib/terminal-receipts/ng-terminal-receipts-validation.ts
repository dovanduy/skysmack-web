import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { TERMINAL_RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';

export class NgTerminalReceiptsValidation extends Validation {
    public formErrors = {
        type: '',
        printReceipt: ''
    };

    public validationMessages: StrIndex<{}> = {
        type: {
            required: ''
        },
        printReceipt: {
            required: ''
        }
    };

    public area = TERMINAL_RECEIPTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
