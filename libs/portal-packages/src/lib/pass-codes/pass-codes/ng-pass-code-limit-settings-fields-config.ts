import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent } from '@skysmack/portal-fields';
import { NgPassCodeLimitSettingsValidation } from './ng-webhooks-settings-validation';
import { PassCodeLimitSettings, PASS_CODES_AREA_KEY, PASS_CODES_ADDITIONAL_PATHS } from '@skysmack/packages-pass-codes';

@Injectable({ providedIn: 'root' })
export class NgPassCodeLimitSettingsFieldsConfig extends FieldsConfig<PassCodeLimitSettings, unknown> {
    public validation = new NgPassCodeLimitSettingsValidation();
    public area = PASS_CODES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, PASS_CODES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<PassCodeLimitSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.expression : false,
                key: 'expression',
                order: 1
            })
        ];

        return fields;
    }
}
