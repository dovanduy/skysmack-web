import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { ACCESS_POLICY_PERMISSIONS_AREA_KEY } from '@skysmack/packages-skysmack-core';

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

    public area = ACCESS_POLICY_PERMISSIONS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
