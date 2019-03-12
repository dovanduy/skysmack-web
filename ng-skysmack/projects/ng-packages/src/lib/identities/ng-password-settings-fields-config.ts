import { Injectable } from '@angular/core';
import { FormRule, Field, FieldTypes, FieldsConfig } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { PasswordSettings } from '@skysmack/packages-identities';
import { NgPasswordSettingsValidation } from './ng-password-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgPasswordSettingsFieldsConfig extends FieldsConfig<PasswordSettings, unknown, any> {
    public validation = new NgPasswordSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(settings?: LocalObject<PasswordSettings, unknown>, dependencies?: any): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.int,
                value: settings ? settings.object.requiredLength : undefined,
                key: 'requiredLength',
                order: 1
            } as Field),
            new Field({
                fieldType: FieldTypes.int,
                value: settings ? settings.object.requiredUniqueChars : undefined,
                key: 'requiredUniqueChars',
                order: 2
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.requireNonAlphanumeric : undefined,
                key: 'requireNonAlphanumeric',
                order: 3
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.requireLowercase : undefined,
                key: 'requireLowercase',
                order: 4
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.requireUppercase : undefined,
                key: 'requireUppercase',
                order: 5
            } as Field),
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.requireDigit : undefined,
                key: 'requireDigit',
                order: 6
            } as Field)
        ];

        return fields;
    }
}
