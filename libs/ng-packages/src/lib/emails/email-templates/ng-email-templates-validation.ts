import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { EMAIL_TEMPLATES_AREA_KEY } from '@skysmack/packages-emails';

export class NgEmailTemplatesValidation extends Validation {
    public formErrors = {
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = EMAIL_TEMPLATES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
