import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { AXIS_PHYSICAL_ACCESS_CONTROL_AREA_KEY } from '@skysmack/ng-axis-physical-access-control';

export class NgAxisPhysicalAccessControlSettingsValidation extends Validation {
    public formErrors = {
        route: '',
        username: '',
        password: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = AXIS_PHYSICAL_ACCESS_CONTROL_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
