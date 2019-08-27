import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { FILE_STORAGE_AREA_KEY } from '@skysmack/packages-file-storage';

export class NgFileStorageUploadValidation extends Validation {
    public formErrors = {
    };

    public validationMessages: StrIndex<{}> = {
    };

    public area = FILE_STORAGE_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
