import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, EnumHelpers } from '@skysmack/framework';
import { Assignment, AssignmentType } from '@skysmack/packages-maintenance';
import { NgAssignmentsValidation } from '@skysmack/ng-packages';
import { FormRule, Field, SelectField } from '@skysmack/ng-ui';
import { FieldsConfig, StringFieldComponent, SelectFieldComponent, HiddenFieldComponent, DateTimeFieldComponent } from '@skysmack/portal-ui';

export interface NgAssignmentFormDependencies {
    availableAssignmentTypes: LocalObject<AssignmentType, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgAssignmentsFieldsConfig extends FieldsConfig<Assignment, number, NgAssignmentFormDependencies> {
    public validation = new NgAssignmentsValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<Assignment, number>, dependencies?: NgAssignmentFormDependencies): Field[] {
        const fields = [
            // TODO(GET_DEPS): DisplayKet is new here - is that still needed?
            new SelectField({
                component: SelectFieldComponent,
                value: entity && entity.object ? entity.object.assignmentTypeId : undefined,
                key: 'assignmentTypeId',
                displayKey: 'assignmentType',
                displaySubKey: 'object.description',
                // validators: [Validators.required],
                optionsData: dependencies && dependencies.availableAssignmentTypes,
                displayNameSelector: 'object.description',
                order: 3,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                label: 'Description',
                // validators: [Validators.required],
                order: 2,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity && entity.object ? entity.object.status : undefined,
                label: 'Occupation state',
                key: 'status',
                displayModifier: (originalValue: number) => {
                    const lowercaseStatus = EnumHelpers.toIndexEnum(Assignment.StatusEnum)[originalValue];
                    return lowercaseStatus ? lowercaseStatus.charAt(0).toUpperCase() + lowercaseStatus.slice(1) : lowercaseStatus;
                },
                validators: [Validators.required],
                optionsData: Assignment.StatusEnum,
                optionsDataType: 'enum',
                order: 3,
                showColumn: true
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.from : undefined,
                key: 'from',
                label: 'From',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.due : undefined,
                key: 'due',
                label: 'Due',
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
