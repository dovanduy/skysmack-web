import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { ROLES_AREA_KEY } from '@skysmack/packages-identities';

export class NgRolesValidation extends Validation {
    public formErrors = {
        name: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: ''
        }
    };

    public area = ROLES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
