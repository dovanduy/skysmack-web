import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { WEBHOOKS_AREA_KEY } from '@skysmack/packages-webhooks';

export class NgWebhooksValidation extends Validation {
    public formErrors = {
        url: '',
        httpMethod: '',
        customHeaders: '',
        packagePath: '',
        source: '',
        eventType: ''
    };

    public validationMessages: StrIndex<{}> = {
        url: {},
        httpMethod: {},
        customHeaders: {},
        packagePath: {},
        source: {},
        eventType: {}
    };

    public area = WEBHOOKS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
