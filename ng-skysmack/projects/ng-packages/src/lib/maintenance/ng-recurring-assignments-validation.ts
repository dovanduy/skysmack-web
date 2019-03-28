import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { RECURRING_ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';

export class NgRecurringAssignmentsValidation extends Validation {
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

    public area = RECURRING_ASSIGNMENTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
