import { Injectable } from '@angular/core';
import { FormRule, Field, FieldTypes, FieldsConfig } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { SignInSettings } from '@skysmack/packages-identities';
import { NgSignInSettingsValidation } from './ng-sign-in-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgSignInSettingsFieldsConfig extends FieldsConfig<SignInSettings, unknown, any> {
    public validation = new NgSignInSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(settings?: LocalObject<SignInSettings, unknown>, dependencies?: any): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.requireConfirmedEmail : undefined,
                key: 'requireConfirmedEmail',
                order: 12
            }),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.requireConfirmedPhoneNumber : undefined,
                key: 'requireConfirmedPhoneNumber',
                order: 13
            })
        ];

        return fields;
    }
}
