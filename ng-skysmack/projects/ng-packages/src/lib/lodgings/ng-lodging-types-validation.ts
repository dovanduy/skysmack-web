import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';

export class LodgingTypesValidation extends Validation {
    public formErrors = {
        name: '',
        lodgingTypeId: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        },
        lodgingTypeId: {
            required: '',
        }
    };

    public area = 'lodging-types';

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
