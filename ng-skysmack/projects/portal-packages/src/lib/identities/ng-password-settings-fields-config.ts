import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { PasswordSettings } from '@skysmack/packages-identities';
import { NgPasswordSettingsValidation, LoadedPackage } from '@skysmack/ng-packages';
import { FieldsConfig, CheckboxFieldComponent, IntFieldComponent } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgPasswordSettingsFieldsConfig extends FieldsConfig<PasswordSettings, unknown> {
    public validation = new NgPasswordSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<PasswordSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.requiredLength : undefined,
                key: 'requiredLength',
                order: 1
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.requiredUniqueChars : undefined,
                key: 'requiredUniqueChars',
                order: 2
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireNonAlphanumeric : undefined,
                key: 'requireNonAlphanumeric',
                order: 3
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireLowercase : undefined,
                key: 'requireLowercase',
                order: 4
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireUppercase : undefined,
                key: 'requireUppercase',
                order: 5
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireDigit : undefined,
                key: 'requireDigit',
                order: 6
            })
        ];

        return fields;
    }
}
