import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent } from '@skysmack/portal-fields';
import { AxisPhysicalAccessControlSettings, AXIS_PHYSICAL_ACCESS_CONTROL_AREA_KEY } from '@skysmack/ng-axis-physical-access-control';
import { NgAxisPhysicalAccessControlSettingsValidation } from './ng-axis-physical-access-control-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgAxisPhysicalAccessControlSettingsFieldsConfig extends FieldsConfig<AxisPhysicalAccessControlSettings, unknown> {
    public validation = new NgAxisPhysicalAccessControlSettingsValidation();
    public area = AXIS_PHYSICAL_ACCESS_CONTROL_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, ['connection']);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<AxisPhysicalAccessControlSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.route : false,
                key: 'route',
                order: 3
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.username : false,
                key: 'username',
                order: 3
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.password : false,
                key: 'password',
                order: 3
            })
        ];

        return fields;
    }
}
