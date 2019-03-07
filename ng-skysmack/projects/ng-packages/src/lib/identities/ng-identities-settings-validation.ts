import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class NgIdentitiesSettingsValidation extends Validation {
    public formErrors = {
        allowedUserNameCharacters: '',
        requireUniqueEmail: '',
        requiredLength: '',
        requiredUniqueChars: '',
        requireNonAlphanumeric: '',
        requireLowercase: '',
        requireUppercase: '',
        requireDigit: '',
        allowedForNewUsers: '',
        maxFailedAccessAttempts: '',
        defaultLockoutTimeSpan: '',
        requireConfirmedEmail: '',
        requireConfirmedPhoneNumber: ''
    };

    public validationMessages: StrIndex<{}> = {
        // allowedUserNameCharacters: {
        //     required: '',
        // }
    };

    public area = 'identities_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
