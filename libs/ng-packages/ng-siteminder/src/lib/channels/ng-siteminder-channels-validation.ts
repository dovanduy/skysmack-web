import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { SITE_MINDER_CHANNELS_AREA_KEY } from '@skysmack/packages-siteminder';

export class NgSiteMinderChannelsValidation extends Validation {
    public formErrors = {
        name: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: ''
        }
    };

    public area = SITE_MINDER_CHANNELS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
