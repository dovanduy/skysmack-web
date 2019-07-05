import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';

export class NgEmailsSmtpSettingsValidation extends Validation {
    public formErrors = {
        host: '',
        port: '',
        username: '',
        password: '',
        enableSsl: '',
    };

    public validationMessages: StrIndex<{}> = {};

    public area = 'emails_smtp_settings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
