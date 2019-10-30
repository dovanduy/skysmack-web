import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgCallDataSettingsValidation extends Validation {
    public formErrors = {
        outputFields: '',
        currencyCode: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'call_data_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
