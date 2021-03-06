import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LockoutSettings, IDENTITES_AREA_KEY, IDENTITES_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { LocalObject } from '@skysmack/framework';
import { NgLockoutSettingsValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { CheckboxFieldComponent, IntFieldComponent, TimeFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgLockoutSettingsFieldsConfig extends FieldsConfig<LockoutSettings, unknown> {
    public validation = new NgLockoutSettingsValidation();
    public area = IDENTITES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, IDENTITES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<LockoutSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.allowedForNewUsers : false,
                key: 'allowedForNewUsers',
                order: 1,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.maxFailedAccessAttempts : undefined,
                key: 'maxFailedAccessAttempts',
                order: 2,
                sortable: true
            }),
            new Field({
                component: TimeFieldComponent,
                value: settings ? settings.object.defaultLockoutTimeSpan : undefined,
                key: 'defaultLockoutTimeSpan',
                order: 3,
                sortable: true
            })
        ];

        return fields;
    }
}
