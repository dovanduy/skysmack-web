import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { FILE_STORAGE_AREA_KEY } from '@skysmack/packages-file-storage';

export class NgFolderCreateValidation extends Validation {
    public formErrors = {
        folderName: ''
    };

    public validationMessages: StrIndex<{}> = {
        folderName: {
            required: ''
        }
    };

    public area = FILE_STORAGE_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
