import { Validation } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class CommercialUsersRolesValidation extends Validation {

    public formErrors = {
        userId: '',
        roleName: '',
    };

    public validationMessages: StrIndex<{}> = {
        userId: {
            required: '',
        },
        roleName: {
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
