import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { ACCESS_POLICY_ROLES_AREA_KEY } from '@skysmack/packages-skysmack-core';

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

    public area = ACCESS_POLICY_ROLES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
