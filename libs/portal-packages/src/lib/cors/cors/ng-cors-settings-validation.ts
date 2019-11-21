import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgCorsSettingsValidation extends Validation {
    public formErrors = {
        enabled: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'cors';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
