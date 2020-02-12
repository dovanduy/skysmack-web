import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { WORKFLOWS_AREA_KEY } from '@skysmack/packages-workflows';

export class NgWorkflowsValidation extends Validation {
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

    public area = WORKFLOWS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
