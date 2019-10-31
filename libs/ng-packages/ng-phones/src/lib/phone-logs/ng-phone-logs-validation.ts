import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PHONE_LOGS_AREA_KEY } from '@skysmack/packages-phones';

export class NgPhoneLogsValidation extends Validation {
    public formErrors = {
        sourceNumber: '',
        destinationNumber: '',
        started: '',
        connected: '',
        ended: '',
        terminatedBySource: '',
        sourcePhoneId: '',
        sourdestinationPhoneIdceNumber: '',
    };

    public validationMessages: StrIndex<{}> = {
        sourceNumber: {
            required: ''
        },
        destinationNumber: {
            required: ''
        },
        started: {
            required: ''
        },
        connected: {
            required: ''
        },
        ended: {
            required: ''
        },
        terminatedBySource: {
            required: ''
        }
    };

    public area = PHONE_LOGS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
