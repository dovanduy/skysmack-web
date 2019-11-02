import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { SITE_MINDER_LODGING_TYPE_RATE_PLANS_AREA_KEY } from '@skysmack/packages-siteminder';

export class NgSiteMinderLodgingTypeRatePlansValidation extends Validation {
    public formErrors = {
        lodgingTypeId: '',
        ratePlanId: ''
    };

    public validationMessages: StrIndex<{}> = {
        lodgingTypeId: {
            required: ''
        },
        ratePlanId: {
            required: ''
        }
    };

    public area = SITE_MINDER_LODGING_TYPE_RATE_PLANS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
