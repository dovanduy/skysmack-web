import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';
import { RecurringAssignment } from '@skysmack/packages-maintenance';
import { RecurringAssignmentsValidation } from './ng-recurring-assignments-validation';
import { FormRule, FieldsConfig, SelectField, Field, FieldTypes } from '@skysmack/ng-ui';

export interface NgRecurringAssignmentFormDependencies {
    availableRecurringAssignments: LocalObject<RecurringAssignment, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsFieldsConfig extends FieldsConfig<RecurringAssignment, number, NgRecurringAssignmentFormDependencies> {
    public validation = new RecurringAssignmentsValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<RecurringAssignment, number>, dependencies?: NgRecurringAssignmentFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.assignmentTypeId : undefined,
                key: 'assignmentTypeId',
                label: 'Assignment Type',
                optionsData: dependencies.availableRecurringAssignments,
                validators: [Validators.required],
                order: 1,
            } as SelectField),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.entityId : undefined,
                key: 'entityId',
                label: 'Entity Id',
                validators: [Validators.required],
                order: 2
            } as Field),

            new Field({
                fieldType: FieldTypes.dateTime,
                value: entity ? entity.object.start : undefined,
                key: 'start',
                label: 'Start',
                validators: [Validators.required],
                order: 3
            } as Field),

            new Field({
                fieldType: FieldTypes.dateTime,
                value: entity ? entity.object.end : undefined,
                key: 'end',
                label: 'End',
                validators: [Validators.required],
                order: 5
            } as Field)
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id) {
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
