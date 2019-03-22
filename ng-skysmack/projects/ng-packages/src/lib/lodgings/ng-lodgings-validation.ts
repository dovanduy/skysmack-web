import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class NgLodgingsValidation extends Validation {
    public formErrors = {
        name: '',
        lodgingTypeId: '',
        disabled: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        },
        lodgingTypeId: {
            required: '',
        },
        disabled: {
            required: '',
        }
    };

    public area = 'lodgings';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
