import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { MAINTENANCE_STATES_AREA_KEY } from '@skysmack/packages-maintenance';

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

    public area = MAINTENANCE_STATES_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
