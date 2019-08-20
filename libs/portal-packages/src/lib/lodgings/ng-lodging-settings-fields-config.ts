import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject, toLocalObject } from '@skysmack/framework';
import { LodgingSettings, LODGINGS_AREA_KEY, LODGINGS_ADDITIONAL_PATHS } from '@skysmack/packages-lodgings';
import { NgLodgingSettingsValidation } from '@skysmack/ng-lodgings';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, DateFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgLodgingSettingsFieldsConfig extends FieldsConfig<LodgingSettings, unknown> {
    public validation = new NgLodgingSettingsValidation();
    public area = LODGINGS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, LODGINGS_ADDITIONAL_PATHS);
    }

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
                order: 1,
                sortable: true
            }),
            new Field({
                component: DateFieldComponent,
                value: initializedSettings ? initializedSettings.object.DefaultCheckIn : undefined,
                key: 'DefaultCheckIn',
                order: 2,
                sortable: true
            }),
            new Field({
                component: DateFieldComponent,
                value: initializedSettings ? initializedSettings.object.DefaultCheckOut : undefined,
                key: 'DefaultCheckOut',
                order: 3,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: initializedSettings ? initializedSettings.object.timeZoneId : undefined,
                key: 'timeZoneId',
                order: 3,
                sortable: true
            })
        ];

        return fields;
    }
}
