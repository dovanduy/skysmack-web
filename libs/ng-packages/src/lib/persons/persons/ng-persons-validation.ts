import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { PERSONS_AREA_KEY } from '@skysmack/packages-persons';

export class NgPersonsValidation extends Validation {
    public formErrors = {
        firstName: '',
        lastName: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        firstName: {
            required: '',
        },
        lastName: {
            required: '',
        },
        displayName: {
            required: '',
        }
    };

    public area = PERSONS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
