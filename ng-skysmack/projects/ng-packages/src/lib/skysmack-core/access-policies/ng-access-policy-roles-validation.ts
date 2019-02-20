import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class AccessPolicyRolesValidation extends Validation {
    public formErrors = {
        ruleId: '',
        roleId: '',
    };

    public validationMessages: StrIndex<{}> = {
        ruleId: {
            required: '',
        },
        roleId: {
            required: '',
        }
    };

    public area = 'access_policy_roles';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
