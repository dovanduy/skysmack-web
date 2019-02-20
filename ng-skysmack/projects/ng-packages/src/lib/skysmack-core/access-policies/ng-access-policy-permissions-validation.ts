import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class AccessPolicyPermissionsValidation extends Validation {
    public formErrors = {
        ruleId: '',
        permission: '',
        packagePath: '',
        order: '',
        isTopLevel: ''
    };

    public validationMessages: StrIndex<{}> = {
        ruleId: {
            required: '',
        },
        permission: {
            required: '',
        },
        packagePath: {
            required: '',
        },
        order: {
            required: '',
        },
        isTopLevel: {
            required: '',
        }
    };

    public area = 'access_policy_permissions';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
