import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { DEFINITIONS_AREA_KEY } from '@skysmack/packages-workflows';

export class NgDefinitionsValidation extends Validation {
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

    public area = DEFINITIONS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
