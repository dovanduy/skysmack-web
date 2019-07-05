import { Validation } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';

export class NgSkysmackSettingsValidation extends Validation {
    public formErrors = {
        name: '',
        defaultTax: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'skysmack';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
