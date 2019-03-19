import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

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

    public area = 'maintenance.assignment_types';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
