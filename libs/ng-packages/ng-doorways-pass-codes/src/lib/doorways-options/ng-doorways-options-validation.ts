import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { DOORWAYS_OPTIONS_AREA_KEY } from './constants/constants';

export class NgDoorwaysOptionsValidation extends Validation {
    public formErrors = {
        doorwayId: '',
        passCodeId: '',
        validFrom: '',
        validTo: '',
        disabled: ''
    };

    public validationMessages: StrIndex<{}> = {
        doorwayId: {
            required: ''
        },
        passCodeId: {
            required: ''
        }
    };

    public area = DOORWAYS_OPTIONS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
