import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class NgMaintenanceStatesValidation extends Validation {
    public formErrors = {
        maintenanceStateTypeId: '',
        description: '',
        status: '',
        id: '',
    };

    public validationMessages: StrIndex<{}> = {
        maintenanceStateTypeId: {
            required: '',
        },
        description: {
            required: '',
        },
        status: {
            required: '',
        },
        id: {
            required: '',
        }
    };

    public area = 'maintenance_states';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
