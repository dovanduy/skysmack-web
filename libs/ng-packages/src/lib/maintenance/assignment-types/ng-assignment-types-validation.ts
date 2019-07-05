import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { ASSIGNMENT_TYPES_AREA_KEY } from '@skysmack/packages-maintenance';

export class NgAssignmentTypesValidation extends Validation {
    public formErrors = {
        assignmentTypeId: '',
        stateId: '',
        description: '',
        expression: '',
        duePeriod: '',
    };

    public validationMessages: StrIndex<{}> = {
        assignmentTypeId: {
            required: ''
        },
        description: {
            required: '',
        },
        stateId: {
            required: '',
        },
        expression: {
            required: '',
        },
        duePeriod: {
            required: '',
        },
    };

    public area = ASSIGNMENT_TYPES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
