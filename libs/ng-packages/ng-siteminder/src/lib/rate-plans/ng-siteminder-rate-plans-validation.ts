import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { SITE_MINDER_RATE_PLANS_AREA_KEY } from '@skysmack/packages-siteminder';

export class NgSiteMinderRatePlansValidation extends Validation {
    public formErrors = {
        name: '',
        currencyCode: '',
        beforeTax: ''
    };

    public validationMessages: StrIndex<{}> = {
        name: {
            required: ''
        },
        currencyCode: {
            required: ''
        },
        beforeTax: {
            required: ''
        }
    };

    public area = SITE_MINDER_RATE_PLANS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
