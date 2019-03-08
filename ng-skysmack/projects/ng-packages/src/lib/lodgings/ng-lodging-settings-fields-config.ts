import { Injectable } from '@angular/core';
import { FormRule, Field, FieldTypes, FieldsConfig } from '@skysmack/ng-ui';
import { LocalObject, toLocalObject } from '@skysmack/framework';
import { NgLodgingSettingsValidation } from './ng-lodging-settings-validation';
import { LodgingSettings } from '@skysmack/packages-lodgings';

export interface NgLodgingSettingsFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgLodgingSettingsFieldsConfig extends FieldsConfig<LodgingSettings, unknown, NgLodgingSettingsFormDependencies> {
    public validation = new NgLodgingSettingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(settings?: LocalObject<LodgingSettings, unknown>, dependencies?: NgLodgingSettingsFormDependencies): Field[] {
        let initializedSettings: LocalObject<LodgingSettings, unknown>;
        if (Object.keys(settings).length > 0) {
            Object.assign(settings.object, new LodgingSettings({}));
            initializedSettings = settings;
        } else {
            initializedSettings = toLocalObject(new LodgingSettings({}), 'none');
        }

        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: initializedSettings ? initializedSettings.object.name : undefined,
                key: 'name',
                order: 1
            } as Field),
            new Field({
                fieldType: FieldTypes.DateField,
                value: initializedSettings ? initializedSettings.object.DefaultCheckIn : undefined,
                key: 'DefaultCheckIn',
                order: 2
            } as Field),
            new Field({
                fieldType: FieldTypes.DateField,
                value: initializedSettings ? initializedSettings.object.DefaultCheckOut : undefined,
                key: 'DefaultCheckOut',
                order: 3
            } as Field),
            new Field({
                fieldType: FieldTypes.string,
                value: initializedSettings ? initializedSettings.object.timeZoneId : undefined,
                key: 'timeZoneId',
                order: 3
            } as Field)
        ];

        return fields;
    }
}