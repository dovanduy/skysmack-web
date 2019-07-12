import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { ACCESS_POLICY_RULES_AREA_KEY } from '@skysmack/packages-skysmack-core';

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

    public area = ACCESS_POLICY_RULES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
