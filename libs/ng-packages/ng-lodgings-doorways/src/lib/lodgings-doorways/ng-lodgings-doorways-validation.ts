import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { LODGINGS_DOORWAYS_AREA_KEY } from './constants/constants';

export class NgLodgingsDoorwaysValidation extends Validation {
    public formErrors = {
        doorwayId: '',
        lodgingId: '',
    };

    public validationMessages: StrIndex<{}> = {
        doorwayId: {
            required: ''
        },
        lodgingId: {
            required: ''
        }
    };

    public area = LODGINGS_DOORWAYS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
