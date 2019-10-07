import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { ASSIGNMENTS_SCHEDULES_AREA_KEY } from '@skysmack/packages-maintenance';

export class NgAssignmentsSchedulesValidation extends Validation {
    public formErrors = {
        assignmentTypeId: '',
        start: '',
        end: '',
        expression: ''
    };

    public validationMessages: StrIndex<{}> = {
        assignmentTypeId: {
            required: '',
        },
        start: {
            required: '',
        },
        end: {
            required: '',
        },
        expression: {
            required: '',
        }
    };

    public area = ASSIGNMENTS_SCHEDULES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
