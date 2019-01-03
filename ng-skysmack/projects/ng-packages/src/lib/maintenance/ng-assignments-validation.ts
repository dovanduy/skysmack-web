import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class AssignmentsValidation extends Validation {
    public formErrors = {
        assignmentTypeId: '',
        description: '',
        status: '',
        due: '',
        from: '',
    };

    public validationMessages: StrIndex<{}> = {
        assignmentTypeId: {
            required: '',
        },
        description: {
            required: '',
        },
        status: {
            required: '',
        },
        due: {
            required: '',
            notBefore: ''
        },
        from: {
            required: '',
        }
    };

    public area = 'maintenance.assignments';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
