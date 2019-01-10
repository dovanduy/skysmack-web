import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class TerminalsValidation extends Validation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = 'terminals';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
