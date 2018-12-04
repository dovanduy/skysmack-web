import { RecordValidation } from 'lib/portal-ui/forms/record-validation';
import { StrIndex } from '@skysmack/framework';

export class LoginValidation extends RecordValidation {

    public formErrors = {
        email: '',
        password: ''
    };

    public validationMessages: StrIndex<{}> = {
        email: {
            required: '',
            email: ''
        },
        password: {
            required: ''
        }
    };

    public area = 'open_iddict';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
