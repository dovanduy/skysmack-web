import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, FieldValueProviderViewModel, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { DynamicFieldsValidation } from './ng-dynamic-fields-validation';
import { SelectField } from '@skysmack/ng-ui';

export interface NgDynamicFieldFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgDynamicFieldsFieldsConfig {
    public validation = new DynamicFieldsValidation();

    public formRules: FormRule[] = [
    ];

    /**
     * Gets the fields for the form used to create or edit a dynamic field.
     * @param availableFields Possible dynamic fields to create. Recieved from the backend.
     * @param field Optional field can be providedto set default values. Used to edit an existing field.
     */
    protected dynamicFields(availableFields: LocalObject<FieldValueProviderViewModel, string>[], field?: LocalObject<FieldSchemaViewModel, string>): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: field ? field.object.display : undefined,
                key: 'display',
                validators: [Validators.required],
                order: 1,
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: field ? field.object.key : undefined,
                key: 'key',
                validators: [Validators.required],
                order: 2,
                disabled: field ? true : false
            } as Field),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: field ? field.object.type : undefined,
                key: 'type',
                validators: [Validators.required],
                order: 3,
                optionsData: availableFields,
                valueSelector: 'object.name',
                disabled: field ? true : false
            } as SelectField),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: field ? field.object.validators : [[]],
                key: 'validators',
                order: 4,
            } as SelectField),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: field ? field.object.writePermission : undefined,
                key: 'writePermission',
                order: 5,
            } as SelectField),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: field ? field.object.readPermission : undefined,
                key: 'readPermission',
                order: 6,
            } as SelectField),
        ];

        return fields;
    }


    public getDynamicFields(availableFields: LocalObject<FieldValueProviderViewModel, string>[], field?: LocalObject<FieldSchemaViewModel, string>): Field[] {
        return this.dynamicFields(availableFields, field).map(aField => {
            // Labels
            aField.label = 'FIELD.FORM.LABELS.' + aField.key.toUpperCase();
            // Placeholders
            aField.placeholder = 'FIELD.FORM.PLACEHOLDERS.' + aField.key.toUpperCase();
            return aField;
        });
    }
}
