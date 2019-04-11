import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-ui';
import { TERMINALS_REDUCER_AREA_KEY } from '@skysmack/packages-terminal-payments';

export class NgTerminalsValidation extends Validation {
    public formErrors = {
        name: '',
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: '',
        }
    };

    public area = TERMINALS_REDUCER_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
