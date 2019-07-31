import { StrIndex } from '@skysmack/framework';
import { Validation } from '@skysmack/ng-dynamic-forms';
import { APPLICATIONS_AREA_KEY } from '@skysmack/packages-identities';

export class NgApplicationsValidation extends Validation {
    public formErrors = {
        clientId: '',
        concurrencyToken: '',
        consentType: '',
        displayName: '',
        permissions: '',
        postLogoutRedirectUris: '',
        properties: '',
        redirectUris: '',
        type: ''
    };

    public validationMessages: StrIndex<{}> = {
        clientId: {
            required: ''
        },
        concurrencyToken: {
            required: ''
        },
        consentType: {
            required: ''
        },
        displayName: {
            required: ''
        },
        permissions: {
            required: ''
        },
        postLogoutRedirectUris: {
            required: ''
        },
        properties: {
            required: ''
        },
        redirectUris: {
            required: ''
        },
        type: {
            required: ''
        }
    };

    public area = APPLICATIONS_AREA_KEY;

    public formValidators = [];

    constructor() {
        super();
        this.translateValidationMessages();
    }
}
