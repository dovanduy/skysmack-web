import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgOpenApiDocumentSettingsValidation extends Validation {
    public formErrors = {
        title: '',
        description: '',
        termsOfService: '',
        contactName: '',
        contactUrl: '',
        contactEmail: '',
        licenseName: '',
        licenseUrl: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'open_api';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
