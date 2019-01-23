import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class AccessPolicyRulesValidation extends Validation {
    public formErrors = {
        access: '',
        authenticated: '',
        includeRoles: '',
    };

    public validationMessages: StrIndex<{}> = {
        access: {
            required: '',
        },
        authenticated: {
            required: '',
        }
    };

    public area = 'access_policy_rules';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
