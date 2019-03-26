import { FormRule } from '../forms/form-rule';
import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from './field';
import { Validation } from '../forms/validation';
import { FieldTypes } from './field-types';
import { EntityFieldsConfig } from './entity-fields-config';

export abstract class FieldsConfig<TRecord, TKey, TDependencies> implements EntityFieldsConfig<TRecord, TKey, TDependencies> {
    public abstract formRules: FormRule[];
    public abstract validation: Validation;
    protected abstract getEntityFields(entity?: LocalObject<TRecord, TKey>, dependencies?: TDependencies): Field[];

    public getStaticFields(entity?: LocalObject<TRecord, TKey>, dependencies?: TDependencies): Field[] {
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
     * @param fields Any dynamic fields added to the package.
     * @param dependencies Any dependencies the form needs.
     */
    public getFields(entity?: LocalObject<TRecord, TKey>, dynamicFields?: LocalObject<FieldSchemaViewModel, string>[], dependencies?: TDependencies): Field[] {
        const fields = this.getStaticFields(entity, dependencies);
        let returnfields;
        if (dynamicFields) {
            returnfields = [
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
                    });
                })
            ].sort((a, b) => a.order - b.order);
        } else {
            returnfields = fields.sort((a, b) => a.order - b.order);
        }

        if (entity && entity.apiError) {
            returnfields.forEach(field => {
                const validationErrors = entity.apiError.validationErrors.find(error => error.fieldKey === field.key);
                field.errors = validationErrors && validationErrors.errors;
            });
        }

        return returnfields;
    }
}
