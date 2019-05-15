import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { USERS_AREA_KEY } from '@skysmack/packages-identities';
import { LoadedPackage } from '@skysmack/ng-redux';
import { FieldsConfig, StringFieldComponent, IntFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { SkysmackSettings } from '@skysmack/packages-skysmack-core';
import { NgSkysmackSettingsValidation } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgSkysmackSettingsFieldsConfig extends FieldsConfig<SkysmackSettings, unknown> {
    public validation = new NgSkysmackSettingsValidation();
    public area = USERS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<SkysmackSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.name : undefined,
                key: 'name',
                order: 1
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.defaultTax : undefined,
                key: 'defaultTax',
                order: 2
            })
        ];

        return fields;
    }
}
