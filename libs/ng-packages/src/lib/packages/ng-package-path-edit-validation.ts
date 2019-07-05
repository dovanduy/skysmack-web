import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class PackagePathEditValidation extends Validation {
    public formErrors = {
        newPath: '',
    };

    public validationMessages: StrIndex<{}> = {
        newPath: {
            required: '',
            invalidStringLength: ''
        }
    };
    public area = 'packages';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
