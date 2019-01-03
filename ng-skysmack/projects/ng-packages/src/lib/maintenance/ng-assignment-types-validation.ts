import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class AssignmentTypesValidation extends Validation {
    public formErrors = {
        stateId: '',
        description: '',
        expression: '',
        duePeriod: '',
    };

    public validationMessages: StrIndex<{}> = {
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
