import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class NgSignInSettingsValidation extends Validation {
    public formErrors = {
        requireConfirmedEmail: '',
        requireConfirmedPhoneNumber: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'identities_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
