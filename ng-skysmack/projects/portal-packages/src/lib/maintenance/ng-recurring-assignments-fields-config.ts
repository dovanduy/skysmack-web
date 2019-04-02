import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { RecurringAssignment } from '@skysmack/packages-maintenance';
import { NgRecurringAssignmentsValidation } from '@skysmack/ng-packages';
import { FormRule, SelectField, Field, FieldTypes } from '@skysmack/ng-ui';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, DateTimeFieldComponent } from '@skysmack/portal-ui';

export interface NgRecurringAssignmentFormDependencies {
    availableRecurringAssignments: LocalObject<RecurringAssignment, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsFieldsConfig extends FieldsConfig<RecurringAssignment, number, NgRecurringAssignmentFormDependencies> {
    public validation = new NgRecurringAssignmentsValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<RecurringAssignment, number>, dependencies?: NgRecurringAssignmentFormDependencies): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.assignmentTypeId : undefined,
                key: 'assignmentTypeId',
                label: 'Assignment Type',
                optionsData: dependencies && dependencies.availableRecurringAssignments,
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.start : undefined,
                key: 'start',
                label: 'Start',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.end : undefined,
                key: 'end',
                label: 'End',
                validators: [Validators.required],
                order: 5,
                showColumn: true
            })
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
