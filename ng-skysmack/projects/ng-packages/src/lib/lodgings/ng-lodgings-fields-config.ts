import { Lodging, LodgingType } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, FieldTypes, SelectField, FieldsConfig } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { NgLodgingsValidation } from './ng-lodgings-validation';

export interface NgLodgingFormDependencies {
    availableLodgingTypes: LocalObject<LodgingType, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgLodgingsFieldsConfig extends FieldsConfig<Lodging, number, NgLodgingFormDependencies> {
    public validation = new NgLodgingsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<Lodging, number>, dependencies?: NgLodgingFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity && entity.object ? entity.object.lodgingTypeId : undefined,
                label: 'Lodging type',
                key: 'lodgingTypeId',
                validators: [Validators.required],
                optionsData: dependencies && dependencies.availableLodgingTypes,
                displayNameSelector: 'object.name',
                disabled: entity && entity.object ? true : false,
                order: 1,
            }),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity && entity.object ? entity.object.status : undefined,
                label: 'Occupation state',
                key: 'status',
                validators: [Validators.required],
                optionsData: Lodging.StatusEnum,
                optionsDataType: 'enum',
                order: 2,
            }),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 3,
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
