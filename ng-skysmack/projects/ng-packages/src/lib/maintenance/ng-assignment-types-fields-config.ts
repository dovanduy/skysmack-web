import { AssignmentType } from '@skysmack/packages-maintenance';
import { AssignmentTypesValidation } from './ng-assignment-types-validation';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { SelectField } from '@skysmack/ng-ui';
import { FieldsConfig } from '@skysmack/ng-ui';

export interface NgAssignmentTypeFormDependencies {
    availableAssignmentTypes: LocalObject<AssignmentType, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesFieldsConfig extends FieldsConfig<AssignmentType, NgAssignmentTypeFormDependencies> {
    public validation = new AssignmentTypesValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<AssignmentType, number>, dependencies?: NgAssignmentTypeFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.stateId : undefined,
                key: 'stateId',
                optionsData: [], // dependencies.availableAssignmentTypes,
                displayNameSelector: 'object.description',
                validators: [Validators.required],
                order: 1
            } as SelectField),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                validators: [Validators.required],
                order: 2
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: 'P1DT1H1M1S1s', // entity ? entity.object.duePeriod : undefined,
                key: 'duePeriod',
                validators: [Validators.required],
                order: 3
            } as Field),

            new Field({
                fieldType: FieldTypes.RecurringExpressionField,
                value: entity ? entity.object.expression : undefined,
                key: 'expression',
                order: 4
            } as Field),
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
