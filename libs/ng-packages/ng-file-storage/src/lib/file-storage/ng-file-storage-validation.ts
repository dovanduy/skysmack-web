import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { FILE_STORAGE_AREA_KEY } from '@skysmack/packages-file-storage';

export class NgFileStorageValidation extends Validation {
    public formErrors = {
        firstName: '',
        lastName: '',
        displayName: ''
    };

    public validationMessages: StrIndex<{}> = {
        firstName: {
            required: '',
        },
        lastName: {
            required: '',
        },
        displayName: {
            required: '',
        }
    };

    public area = FILE_STORAGE_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
