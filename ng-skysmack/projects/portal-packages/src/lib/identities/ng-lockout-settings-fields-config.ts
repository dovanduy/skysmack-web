import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-ui';
import { LockoutSettings } from '@skysmack/packages-identities';
import { LocalObject } from '@skysmack/framework';
import { NgLockoutSettingsValidation, LoadedPackage } from '@skysmack/ng-packages';
import { FieldsConfig, CheckboxFieldComponent, IntFieldComponent, TimeFieldComponent } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgLockoutSettingsFieldsConfig extends FieldsConfig<LockoutSettings, unknown> {
    public validation = new NgLockoutSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<LockoutSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.allowedForNewUsers : undefined,
                key: 'allowedForNewUsers',
                order: 1
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.maxFailedAccessAttempts : undefined,
                key: 'maxFailedAccessAttempts',
                order: 2
            }),
            new Field({
                component: TimeFieldComponent,
                value: settings ? settings.object.defaultLockoutTimeSpan : undefined,
                key: 'defaultLockoutTimeSpan',
                order: 3
            })
        ];

        return fields;
    }
}
