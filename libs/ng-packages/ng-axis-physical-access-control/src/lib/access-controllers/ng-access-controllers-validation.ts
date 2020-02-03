import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { ACCESS_CONTROLLERS_AREA_KEY } from './constants/constants';

export class NgAccessControllersValidation extends Validation {
    public formErrors = {
        route: '',
        username: '',
        password: '',
        skipVerifySSL: ''
    };

    public validationMessages: StrIndex<{}> = {
        route: {
            required: ''
        },
        username: {
            required: ''
        },
        password: {
            required: ''
        },
        skipVerifySSL: {
            required: ''
        }
    };

    public area = ACCESS_CONTROLLERS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
