import { Validation } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialTenantsUsersValidation extends Validation {

    public formErrors = {
        userId: '',
        tenantId: '',
        status: ''
    };

    public validationMessages: StrIndex<{}> = {
        userId: {
            required: '',
        },
        tenantId: {
            required: ''
        },
        status: {
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
