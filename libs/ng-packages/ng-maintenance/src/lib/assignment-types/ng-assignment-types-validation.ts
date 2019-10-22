import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { ASSIGNMENT_TYPES_AREA_KEY } from '@skysmack/packages-maintenance';

export class NgAssignmentTypesValidation extends Validation {
    public formErrors = {
        stateId: '',
        description: '',
        duePeriod: ''
    };

    public validationMessages: StrIndex<{}> = {
        stateId: {
            required: ''
        },
        description: {
            required: ''
        },
        duePeriod: {
            required: ''
        }
    };

    public area = ASSIGNMENT_TYPES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
