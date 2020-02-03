import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { EmailSettings } from '@skysmack/packages-identities';
import { NgEmailSettingsValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgEmailSettingsFieldsConfig extends FieldsConfig<EmailSettings, unknown> {
    public validation = new NgEmailSettingsValidation();
    public area = OAUTH2_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<EmailSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.address : undefined,
                key: 'address',
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.displayName : undefined,
                key: 'displayName',
                order: 2,
                sortable: true
            })
        ];

        return fields;
    }
}
