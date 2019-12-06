import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { DOORWAY_RELATIONS_AREA_KEY } from '../constants/constants';

export class NgDoorwayRelationsValidation extends Validation {
    public formErrors = {
        outerDoorwayId: '',
        innerDoorwayId: ''
    };

    public validationMessages: StrIndex<{}> = {
        outerDoorwayId: {
            required: '',
        },
        innerDoorwayId: {
            required: '',
        }
    };

    public area = DOORWAY_RELATIONS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
