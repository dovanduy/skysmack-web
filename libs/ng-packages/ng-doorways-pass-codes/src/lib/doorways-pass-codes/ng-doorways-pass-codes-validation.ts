import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { DOORWAYS_PASS_CODES_AREA_KEY } from './constants/constants';

export class NgDoorwaysPassCodesValidation extends Validation {
    public formErrors = {
        name: '',
        description: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        },
        description: {
            required: '',
        }
    };

    public area = DOORWAYS_PASS_CODES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
