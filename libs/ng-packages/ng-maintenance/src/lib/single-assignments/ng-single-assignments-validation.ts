import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { SINGLE_ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';

export class NgSingleAssignmentsValidation extends Validation {
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

    public area = SINGLE_ASSIGNMENTS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
