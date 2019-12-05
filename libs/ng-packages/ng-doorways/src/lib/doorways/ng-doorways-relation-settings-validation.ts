import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { DOORWAYS_AREA_KEY } from './constants/constants';

export class NgDoorwaysRelationSettingsValidation extends Validation {
    public formErrors = {
        allowCircularRelations: ''
    };

    public validationMessages: StrIndex<{}> = {};

    public area = DOORWAYS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
