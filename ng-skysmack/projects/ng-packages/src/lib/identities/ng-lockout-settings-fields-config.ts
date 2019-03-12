import { Injectable } from '@angular/core';
import { FormRule, Field, FieldTypes, FieldsConfig } from '@skysmack/ng-ui';
import { LockoutSettings } from '@skysmack/packages-identities';
import { NgLockoutSettingsValidation } from './ng-lockout-settings-validation';
import { LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLockoutSettingsFieldsConfig extends FieldsConfig<LockoutSettings, unknown, any> {
    public validation = new NgLockoutSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(settings?: LocalObject<LockoutSettings, unknown>, dependencies?: any): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: settings ? settings.object.allowedForNewUsers : undefined,
                key: 'allowedForNewUsers',
                order: 1
            }),
            new Field({
                fieldType: FieldTypes.int,
                value: settings ? settings.object.maxFailedAccessAttempts : undefined,
                key: 'maxFailedAccessAttempts',
                order: 2
            }),
            new Field({
                fieldType: FieldTypes.TimeField,
                value: settings ? settings.object.defaultLockoutTimeSpan : undefined,
                key: 'defaultLockoutTimeSpan',
                order: 3
            })
        ];

        return fields;
    }
}
