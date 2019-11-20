import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { TEMPLATES_AREA_KEY } from '@skysmack/packages-templates';

export class NgTemplatesValidation extends Validation {
    public formErrors = {
        title: '',
        body: '',
        dataRoutes: ''
    };

    public validationMessages: StrIndex<{}> = {
        title: {
            required: ''
        },
        body: {},
        dataRoutes: {}
    };

    public area = TEMPLATES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
