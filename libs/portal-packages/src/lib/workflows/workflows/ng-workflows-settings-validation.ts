import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgWorkflowSettingsValidation extends Validation {
    public formErrors = {
        enabled: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'workflows';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
