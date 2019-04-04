import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { EntityFieldsConfig, FormRule, Validation, Field, FieldTypes } from '@skysmack/ng-ui';
import { IntFieldComponent } from '../components/field-components/components/int-field/int-field.component';
import { Type } from '@angular/core';
import { LimitedStringFieldComponent } from '../components/field-components/components/limited-string-field/limited-string-field.component';
import { GeographyFieldComponent } from '../components/field-components/components/geography-field/geography-field.component';
import { DoubleFieldComponent } from '../components/field-components/components/double-field/double-field.component';
import { DecimalFieldComponent } from '../components/field-components/components/decimal-field/decimal-field.component';
import { DateTimeFieldComponent } from '../components/field-components/components/date-time-field/date-time-field.component';
import { StringFieldComponent } from '../components/field-components/components/string-field/string-field.component';
import { LoadedPackage } from '@skysmack/ng-packages';

export abstract class FieldsConfig<TRecord, TKey, TDependencies> implements EntityFieldsConfig<TRecord, TKey, TDependencies> {
    public abstract formRules: FormRule[];
    public abstract validation: Validation;
    protected abstract getEntityFields(entity?: LocalObject<TRecord, TKey>, dependencies?: TDependencies, loadedPackage?: LoadedPackage): Field[];

    public getStaticFields(entity?: LocalObject<TRecord, TKey>, dependencies?: TDependencies, loadedPackage?: LoadedPackage): Field[] {
        const fieldArea = this.validation.area.toUpperCase() + '.FORM.';
        return this.getEntityFields(entity, dependencies, loadedPackage).map(field => {
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
    public getFields(entity?: LocalObject<TRecord, TKey>, dynamicFields?: LocalObject<FieldSchemaViewModel, string>[], dependencies?: TDependencies, loadedPackage?: LoadedPackage): Field[] {
        const fields = this.getStaticFields(entity, dependencies, loadedPackage);
        let returnfields;
        if (dynamicFields) {
            returnfields = [
                ...fields,
                ...dynamicFields.map(dynamicField => {
                    return new Field({
                        fieldType: Number(FieldTypes[dynamicField.object.type]),
                        component: this.getComponentFromDynamicFieldType(dynamicField.object.type),
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

    protected getComponentFromDynamicFieldType(type: string): Type<any> {
        switch (type) {
            case 'int': return IntFieldComponent;
            case 'string': return StringFieldComponent;
            case 'dateTime': return DateTimeFieldComponent;
            case 'decimal': return DecimalFieldComponent;
            case 'double': return DoubleFieldComponent;
            case 'geography': return GeographyFieldComponent;
            case 'limitedString': return LimitedStringFieldComponent;
            default: console.log('This field type is not defined. Please create a component for it'); return undefined;
        }
    }
}
