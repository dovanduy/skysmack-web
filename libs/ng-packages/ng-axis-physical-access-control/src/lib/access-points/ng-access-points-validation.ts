import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { ACCESS_POINTS_AREA_KEY } from './constants/constants';

export class NgAccessPointsValidation extends Validation {
    public formErrors = {
        id: '',
        doorwayId: ''
    };

    public validationMessages: StrIndex<{}> = {
        id: {
            required: ''
        },
        doorwayId: {
            required: ''
        }
    };

    public area = ACCESS_POINTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
