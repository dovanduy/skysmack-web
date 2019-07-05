import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { SignInSettings } from '@skysmack/packages-identities';
import { NgSignInSettingsValidation } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, CheckboxFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';

@Injectable({ providedIn: 'root' })
export class NgSignInSettingsFieldsConfig extends FieldsConfig<SignInSettings, unknown> {
    public validation = new NgSignInSettingsValidation();
    public area = OAUTH2_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<SignInSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireConfirmedEmail : false,
                key: 'requireConfirmedEmail',
                order: 12
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireConfirmedPhoneNumber : false,
                key: 'requireConfirmedPhoneNumber',
                order: 13
            })
        ];

        return fields;
    }
}
