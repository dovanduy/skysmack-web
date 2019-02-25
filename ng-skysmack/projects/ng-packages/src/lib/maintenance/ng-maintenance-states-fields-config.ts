import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { MaintenanceState } from '@skysmack/packages-maintenance';
import { NgMaintenanceStatesValidation } from './ng-maintenance-states-validation';
import { FieldsConfig, FormRule, Field, FieldTypes } from '@skysmack/ng-ui';

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
                order: 1
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.status : undefined,
                key: 'status',
                label: 'Status',
                validators: [Validators.required],
                order: 2
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                label: 'Id',
                validators: [Validators.required],
                order: 3
            } as Field)
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            } as Field));
        }

        return fields;
    }
}
