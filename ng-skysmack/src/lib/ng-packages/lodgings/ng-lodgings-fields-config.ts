import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DocumentFieldsConfig } from 'lib/portal-ui/fields/document-fields-config';
import { FormRule } from 'lib/portal-ui/forms/form-rule';
import { LocalObject } from '@skysmack/framework';
import { Lodging, LodgingType } from '@skysmack/packages-lodgings';
import { Field } from 'lib/portal-ui/fields/field';
import { FieldTypes } from 'lib/portal-ui/fields/field-types';
import { LodgingTypesValidation } from './ng-lodging-types-validation';
import { SelectField } from 'lib/portal-ui/fields/select-field';

export interface NgLodgingFormDependencies {
    availableLodgingTypes: LocalObject<LodgingType>[];
}

@Injectable({ providedIn: 'root' })
export class NgLodgingsFieldsConfig extends DocumentFieldsConfig<Lodging, NgLodgingFormDependencies> {
    public validation = new LodgingTypesValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<Lodging>, dependencies?: NgLodgingFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity && entity.object ? entity.object.lodgingTypeId : undefined,
                label: 'Lodging type',
                key: 'lodgingTypeId',
                validators: [Validators.required],
                optionsData: dependencies.availableLodgingTypes,
                displayNameSelector: 'object.name',
                disabled: entity && entity.object ? true : false,
                order: 1,
            } as SelectField),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity && entity.object ? entity.object.occupationState : undefined,
                label: 'Occupation state',
                key: 'occupationState',
                validators: [Validators.required],
                optionsData: Lodging.OccupationStateEnum,
                optionsDataType: 'enum',
                order: 2,
            } as SelectField),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 3,
                showColumn: true
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
