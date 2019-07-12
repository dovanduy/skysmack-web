import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgPasswordSettingsValidation extends Validation {
public formErrors = {
    requiredLength: '',
    requiredUniqueChars: '',
    requireNonAlphanumeric: '',
    requireLowercase: '',
    requireUppercase: '',
    requireDigit: '',
};

    public validationMessages: StrIndex<{}> = {};

    public area = 'identities_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
