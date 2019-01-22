import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class LodgingTypesValidation extends Validation {
    public formErrors = {
        name: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: ''
        }
    };

    public area = 'lodging_types';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
