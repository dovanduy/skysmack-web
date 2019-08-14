import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { CLIENTS_AREA_KEY } from '@skysmack/packages-identities';


export class NgClientsValidation extends Validation {
    public formErrors = {
        name: '',
        description: '',
        online: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        },
        description: {
            required: '',
        },
        online: {
            required: '',
        }
    };

    public area = CLIENTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
