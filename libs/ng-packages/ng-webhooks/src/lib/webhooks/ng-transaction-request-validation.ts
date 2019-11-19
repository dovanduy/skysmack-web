import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { WEBHOOKS_AREA_KEY } from '@skysmack/packages-webhooks';

export class NgTransactionRequestValidation extends Validation {
    public formErrors = {
        clientId: '',
        connection: '',
        webhookId: '',
        amount: '',
        reference: '',
        currency: ''
    };

    public validationMessages: StrIndex<{}> = {
        clientId: {
            required: '',
        },
        webhookId: {
            required: '',
        },
        connection: {
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

    public area = WEBHOOKS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
