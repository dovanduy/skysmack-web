import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class MaintenanceStatesValidation extends Validation {
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

    public area = 'maintenance.maintenance_states';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}