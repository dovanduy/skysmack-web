import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { DOORWAYS_AREA_KEY } from '../constants/constants';

export class NgDoorwaysValidation extends Validation {
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

    public area = DOORWAYS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
