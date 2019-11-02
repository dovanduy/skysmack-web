import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_AREA_KEY } from '@skysmack/packages-siteminder';

export class NgSiteMinderLodgingTypeRatePlanChannelsValidation extends Validation {
    public formErrors = {
        lodgingTypeId: '',
        ratePlanId: '',
        channelId: ''
    };

    public validationMessages: StrIndex<{}> = {
        lodgingTypeId: {
            required: ''
        },
        ratePlanId: {
            required: ''
        },
        channelId: {
            required: ''
        }
    };

    public area = SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
