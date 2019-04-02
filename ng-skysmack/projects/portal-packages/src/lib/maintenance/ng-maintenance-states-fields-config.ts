import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { MaintenanceState, MaintenanceEntityStatus } from '@skysmack/packages-maintenance';
import { NgMaintenanceStatesValidation } from '@skysmack/ng-packages';
import { FormRule, Field, FieldTypes, SelectField } from '@skysmack/ng-ui';
import { FieldsConfig } from '@skysmack/portal-ui';

export interface NgMaintenanceStateFormDependencies {
    availableMaintenanceStates: LocalObject<MaintenanceState, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesFieldsConfig extends FieldsConfig<MaintenanceState, number, NgMaintenanceStateFormDependencies> {
    public validation = new NgMaintenanceStatesValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<MaintenanceState, number>, dependencies?: NgMaintenanceStateFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                label: 'Description',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.status : undefined,
                key: 'status',
                label: 'Status',
                validators: [Validators.required],
                optionsData: MaintenanceEntityStatus,
                optionsDataType: 'ts-enum',
                order: 2,
                showColumn: true
            })
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
