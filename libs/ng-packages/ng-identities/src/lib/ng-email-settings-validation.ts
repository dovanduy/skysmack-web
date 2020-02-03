import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgEmailSettingsValidation extends Validation {
    public formErrors = {
        address: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'identities_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
