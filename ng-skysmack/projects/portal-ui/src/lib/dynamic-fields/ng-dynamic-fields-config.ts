import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, SetFieldKeyRule, FieldsConfig } from '@skysmack/ng-ui';
import { LocalObject, FieldValueProviderViewModel, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { DynamicFieldsValidation } from './ng-dynamic-fields-validation';
import { SelectField } from '@skysmack/ng-ui';

export interface NgDynamicFieldFormDependencies {
    availableFields: LocalObject<FieldValueProviderViewModel, string>[];
}

@Injectable({ providedIn: 'root' })
export class NgDynamicFieldsFieldsConfig extends FieldsConfig<FieldSchemaViewModel, string, NgDynamicFieldFormDependencies> {
    public validation = new DynamicFieldsValidation();

    public formRules: FormRule[] = [
        new SetFieldKeyRule(['display'])
    ];

    /**
     * Gets the fields for the form used to create or edit a dynamic field.
     * @param availableFields Possible dynamic fields to create. Recieved from the backend.
     * @param field Optional field can be providedto set default values. Used to edit an existing field.
     */
    protected getEntityFields(field?: LocalObject<FieldSchemaViewModel, string>, dependencies?: NgDynamicFieldFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: field ? field.object.display : undefined,
                key: 'display',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: field ? field.object.key : undefined,
                key: 'key',
                validators: [Validators.required],
                order: 2,
                disabled: field ? true : false,
                showColumn: true
            } as Field),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: field ? field.object.type : undefined,
                key: 'type',
                validators: [Validators.required],
                order: 3,
                optionsData: dependencies && dependencies.availableFields,
                valueSelector: 'object.name',
                disabled: field ? true : false,
                showColumn: true
            } as SelectField),

            new Field({
                fieldType: FieldTypes.ValidatorsField,
                value: field ? [field.object.validators] : undefined,
                key: 'validators',
                order: 4,
            } as Field),

            new Field({
                fieldType: FieldTypes.FieldPermissionField,
                value: field ? field.object.writePermission : undefined,
                key: 'writePermission',
                order: 5,
            } as Field),

            new Field({
                fieldType: FieldTypes.FieldPermissionField,
                value: field ? field.object.readPermission : undefined,
                key: 'readPermission',
                order: 6,
            } as Field),
        ];

        return fields;
    }


    public getDynamicFields(availableFields: LocalObject<FieldValueProviderViewModel, string>[], field?: LocalObject<FieldSchemaViewModel, string>): Field[] {
        return this.getEntityFields(field, { availableFields }).map(aField => {
            // Labels
            aField.label = 'FIELDS.FORM.LABELS.' + aField.key.toUpperCase();
            // Placeholders
            aField.placeholder = 'FIELDS.FORM.PLACEHOLDERS.' + aField.key.toUpperCase();
            return aField;
        });
    }
}
