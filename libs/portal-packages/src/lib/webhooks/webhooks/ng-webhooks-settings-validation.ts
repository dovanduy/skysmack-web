import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgWebhookSettingsValidation extends Validation {
    public formErrors = {
        enabled: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'webhooks';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
