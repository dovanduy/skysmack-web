import { FormRule } from '../forms/form-rule';
import { LocalObject, FieldSchemaViewModel, Record } from '@skysmack/framework';
import { Field } from './field';
import { Validation } from '../forms/validation';
import { FieldTypes } from './field-types';

export abstract class FieldsConfig<TRecord extends Record<TKey>, TKey, TDependencies> {
    public abstract formRules: FormRule[];
    public abstract validation: Validation;
    protected abstract getEntityFields(entity?: LocalObject<TRecord, any>, dependencies?: any): Field[];

    public getStaticFields(entity?: LocalObject<TRecord, any>, dependencies?: TDependencies): Field[] {
        const fieldArea = this.validation.area.toUpperCase() + '.FORM.';
        return this.getEntityFields(entity, dependencies).map(field => {
            // Labels
            field.label = fieldArea + 'LABELS.' + field.key.toUpperCase();
            // Placeholders
            field.placeholder = fieldArea + 'PLACEHOLDERS.' + field.key.toUpperCase();
            return field;
        });
    }

    /**
    * Gets all fields needed to create a form. Combines standard and dynamic fields into one array.
    * @param entity Entity used for edit forms.
    * @param dynamicFields Any dynamic fields added to the package.
    * @param dependencies Any dependencies the form needs.
    */
    public getFields(entity?: LocalObject<TRecord, TKey>, dynamicFields?: LocalObject<FieldSchemaViewModel, string>[], dependencies?: TDependencies): Field[] {
        const fields = this.getStaticFields(entity, dependencies);
        if (dynamicFields) {
            const returnfields = [
                ...fields,
                ...dynamicFields.map(dynamicField => {
                    return new Field({
                        fieldType: Number(FieldTypes[dynamicField.object.type]),
                        value: entity ? entity.object[dynamicField.object.key] : undefined,
                        key: dynamicField.object.key,
                        label: dynamicField.object.display,
                        placeholder: dynamicField.object.display,
                        order: 4,
                        showColumn: true,
                        dynamicField: true
                    } as Field);
                })
            ].sort((a, b) => a.order - b.order);

            return returnfields;
        } else {
            return fields.sort((a, b) => a.order - b.order);
        }
    }
}
