import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { TERMINALS_AREA_KEY } from '@skysmack/packages-terminal-payments';

export class NgTransactionRequestValidation extends Validation {
    public formErrors = {
        clientId: '',
        terminalId: '',
        amount: '',
        reference: '',
        currency: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        },
        terminalId: {
            required: '',
        },
        amount: {
            required: '',
        },
        reference: {
            required: '',
        },
        currency: {
            required: '',
        }
    };

    public area = TERMINALS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
