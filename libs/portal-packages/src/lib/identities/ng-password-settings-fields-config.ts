import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { PasswordSettings, IDENTITES_AREA_KEY, IDENTITES_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { NgPasswordSettingsValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { IntFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgPasswordSettingsFieldsConfig extends FieldsConfig<PasswordSettings, unknown> {
    public validation = new NgPasswordSettingsValidation();
    public area = IDENTITES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, IDENTITES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<PasswordSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.requiredLength : undefined,
                key: 'requiredLength',
                order: 1,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.requiredUniqueChars : undefined,
                key: 'requiredUniqueChars',
                order: 2,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireNonAlphanumeric : false,
                key: 'requireNonAlphanumeric',
                order: 3,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireLowercase : false,
                key: 'requireLowercase',
                order: 4,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireUppercase : false,
                key: 'requireUppercase',
                order: 5,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireDigit : false,
                key: 'requireDigit',
                order: 6,
                sortable: true
            })
        ];

        return fields;
    }
}
