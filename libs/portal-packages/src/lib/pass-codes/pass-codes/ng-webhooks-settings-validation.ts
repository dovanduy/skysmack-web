import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PASS_CODES_AREA_KEY } from '@skysmack/packages-pass-codes';

export class NgPassCodeLimitSettingsValidation extends Validation {
    public formErrors = {
        expression: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = PASS_CODES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
