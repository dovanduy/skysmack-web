import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { LODGINGS_AREA_KEY } from '@skysmack/packages-lodgings';

export class NgLodgingsValidation extends Validation {
    public formErrors = {
        name: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = LODGINGS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
