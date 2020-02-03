import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgTemplatePackageSettingsValidation extends Validation {
    public formErrors = {
        templatePackagePath: '',
        confirmEmailTemplateId: '',
        resetPasswordTemplateId: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'identities_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
