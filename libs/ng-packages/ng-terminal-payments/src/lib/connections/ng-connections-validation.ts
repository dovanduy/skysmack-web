import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { CONNECTIONS_AREA_KEY } from '@skysmack/packages-terminal-payments';


export class NgConnectionsValidation extends Validation {
    public formErrors = {
        clientId: '',
        terminalId: '',
    };

    public validationMessages: StrIndex<{}> = {
        clientId: {
            required: '',
        },
        terminalId: {
            required: '',
        }
    };

    public area = CONNECTIONS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
