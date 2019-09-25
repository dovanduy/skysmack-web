import { Validation } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialUsersRolesValidation extends Validation {

    public formErrors = {
        userId: '',
        roleId: '',
    };

    public validationMessages: StrIndex<{}> = {
        userId: {
            required: '',
        },
        roleId: {
            required: ''
        }
    };

    public area = 'COMMERCIAL_USERS';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
