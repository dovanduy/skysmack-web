import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class RecurringAssignmentsValidation extends Validation {
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
        entityId: {
            required: '',
        },
        start: {
            required: '',
        },
        end: {
            required: '',
        },
        id: {
            required: '',
        }
    };

    public area = 'maintenance.recurring_assignments';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
