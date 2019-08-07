import { Validation } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialTenantsValidation extends Validation {

    public formErrors = {
        name: '',
        hostname: '',
        safeSubdomain: '',
        state: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        },
        hostname: {
            required: ''
        },
        safeSubdomain: {
            required: '',
        },
        state: {
            required: ''
        }
    };

    public area = 'COMMERCIAL_TENANTS';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
