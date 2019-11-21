import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { CheckboxFieldComponent } from '@skysmack/portal-fields';
import { CORS_AREA_KEY, CORS_ADDITIONAL_PATHS, CorsSettings } from '@skysmack/packages-cors';
import { NgCorsSettingsValidation } from './ng-cors-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgCorsSettingsFieldsConfig extends FieldsConfig<CorsSettings, unknown> {
    public validation = new NgCorsSettingsValidation();
    public area = CORS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, CORS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<CorsSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.allowAllOrigins : false,
                key: 'allowAllOrigins',
                order: 3
            })
        ];

        return fields;
    }
}
