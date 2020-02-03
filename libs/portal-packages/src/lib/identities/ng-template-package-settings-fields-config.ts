import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { TemplatePackageSettings } from '@skysmack/packages-identities';
import { NgTemplatePackageSettingsValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { CheckboxFieldComponent, StringFieldComponent, IntFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgTemplatePackageSettingsFieldsConfig extends FieldsConfig<TemplatePackageSettings, unknown> {
    public validation = new NgTemplatePackageSettingsValidation();
    public area = OAUTH2_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<TemplatePackageSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.templatePackagePath : undefined,
                key: 'templatePackagePath',
                order: 1,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.confirmEmailTemplateId : undefined,
                key: 'confirmEmailTemplateId',
                order: 2,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.resetPasswordTemplateId : undefined,
                key: 'resetPasswordTemplateId',
                order: 2,
                sortable: true
            })
        ];

        return fields;
    }
}
