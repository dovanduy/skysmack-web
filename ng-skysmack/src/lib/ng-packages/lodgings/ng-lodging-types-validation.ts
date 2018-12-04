import { StrIndex } from '@skysmack/framework';
import { RecordValidation } from 'lib/portal-ui/forms/record-validation';

export class LodgingTypesValidation extends RecordValidation {
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
