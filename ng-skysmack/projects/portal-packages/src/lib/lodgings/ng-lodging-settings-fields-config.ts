import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-ui';
import { LocalObject, toLocalObject } from '@skysmack/framework';
import { LodgingSettings } from '@skysmack/packages-lodgings';
import { NgLodgingSettingsValidation, LoadedPackage } from '@skysmack/ng-packages';
import { FieldsConfig, StringFieldComponent, DateFieldComponent } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgLodgingSettingsFieldsConfig extends FieldsConfig<LodgingSettings, unknown> {
    public validation = new NgLodgingSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<LodgingSettings, unknown>): Field[] {
        let initializedSettings: LocalObject<LodgingSettings, unknown>;
        if (Object.keys(settings).length > 0) {
            Object.assign(settings.object, new LodgingSettings({}));
            initializedSettings = settings;
        } else {
            initializedSettings = toLocalObject(new LodgingSettings({}), 'none');
        }

        const fields = [
            new Field({
                component: StringFieldComponent,
                value: initializedSettings ? initializedSettings.object.name : undefined,
                key: 'name',
                order: 1
            }),
            new Field({
                component: DateFieldComponent,
                value: initializedSettings ? initializedSettings.object.DefaultCheckIn : undefined,
                key: 'DefaultCheckIn',
                order: 2
            }),
            new Field({
                component: DateFieldComponent,
                value: initializedSettings ? initializedSettings.object.DefaultCheckOut : undefined,
                key: 'DefaultCheckOut',
                order: 3
            }),
            new Field({
                component: StringFieldComponent,
                value: initializedSettings ? initializedSettings.object.timeZoneId : undefined,
                key: 'timeZoneId',
                order: 3
            })
        ];

        return fields;
    }
}
