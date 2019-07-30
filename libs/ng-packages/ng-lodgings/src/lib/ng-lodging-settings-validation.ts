import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgLodgingSettingsValidation extends Validation {
    public formErrors = {
        allowedUserNameCharacters: '',
        requireUniqueEmail: '',
        requiredLength: '',
    };

    public validationMessages: StrIndex<{}> = {
        // allowedUserNameCharacters: {
        //     required: '',
        // }
    };

    public area = 'lodging_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
