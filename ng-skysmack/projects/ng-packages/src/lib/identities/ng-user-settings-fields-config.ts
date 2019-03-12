import { Injectable } from '@angular/core';
import { FormRule, Field, FieldTypes, FieldsConfig } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { UserSettings } from '@skysmack/packages-identities';
import { NgUserSettingsValidation } from './ng-user-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgUserSettingsFieldsConfig extends FieldsConfig<UserSettings, unknown, any> {
    public validation = new NgUserSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(settings?: LocalObject<UserSettings, unknown>, dependencies?: any): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: settings ? settings.object.allowedUserNameCharacters : undefined,
                key: 'allowedUserNameCharacters',
                order: 1
            }),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.requireUniqueEmail : undefined,
                key: 'requireUniqueEmail',
                order: 2
            })
        ];

        return fields;
    }
}
