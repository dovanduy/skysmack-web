import { Validators } from '@angular/forms';
import { FieldsConfig } from './fields-config';
import { EntityFieldsValidation } from './entity-field-validation';
import { LocalObject, FieldValueProviderViewModel, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from './field';
import { FieldTypes } from './field-types';
import { SelectField } from './select-field';

export abstract class DocumentFieldsConfig<TRecord, TDependencies> extends FieldsConfig<TRecord, TDependencies> {
    public fieldsValidation = new EntityFieldsValidation();

    /**
    * Gets the fields for the form used to create or edit a dynamic field.
    * @param availableFields Possible dynamic fields to create. Recieved from the backend.
    * @param field Optional field can be providedto set default values. Used to edit an existing field.
    */
    protected dynamicFields(availableFields: LocalObject<FieldValueProviderViewModel>[], field?: LocalObject<FieldSchemaViewModel>): Field[] {
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

    public getDynamicFields(availableFields: LocalObject<FieldValueProviderViewModel>[], field?: LocalObject<FieldSchemaViewModel>): Field[] {
        return this.dynamicFields(availableFields, field).map(aField => {
            // Labels
            aField.label = 'FIELD.FORM.LABELS.' + aField.key.toUpperCase();
            // Placeholders
            aField.placeholder = 'FIELD.FORM.PLACEHOLDERS.' + aField.key.toUpperCase();
            return aField;
        });
    }
}
