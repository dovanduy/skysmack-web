import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class NgLockoutSettingsValidation extends Validation {
    public formErrors = {
        allowedForNewUsers: '',
        maxFailedAccessAttempts: '',
        defaultLockoutTimeSpan: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'identities_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
