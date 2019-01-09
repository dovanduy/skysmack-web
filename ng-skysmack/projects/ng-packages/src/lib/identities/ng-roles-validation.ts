import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class RolesValidation extends Validation {
    public formErrors = {
        name: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: ''
        }
    };

    public area = 'roles';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
