import { getProperty } from '@skysmack/framework';
import { SelectFieldOption } from '../models/select-field-option';

export class FieldHelpers {
    public static getFieldOptionsOfArray(entities: any[], keyProp = 'object.id', valueProp = 'object.name'): SelectFieldOption[] {
        return entities ? entities.map(entity => {
            return {
                value: getProperty(entity, keyProp),
                displayName: getProperty(entity, valueProp)
            };
        }) : [];
    }

    public static getFieldOptionsOfEnum(targetEnums: any, typeScriptEnum = false, useEnumValue = false): SelectFieldOption[] {
        // When using the typescript enum keyword, the enum gets too many props.
        // Code below transform the typescript enum to have same structure as enums generated from swagger code gen.
        if (typeScriptEnum) {
            const processed = {};
            Object.keys(targetEnums).forEach(key => {
                if (!Number.isInteger(Number(key))) {
                    processed[key] = targetEnums[key];
                }
            });
            targetEnums = processed;
        }

        // Convert the enum object into a proper options object for the select field.
        if (useEnumValue) {
            // The enums actual value will be used.
            // USD: 208 will equal value to be 208
            return Object.keys(targetEnums).map((key, i = 0) => {
                return {
                    value: targetEnums[key],
                    displayName: key
                };
            });
        } else {
            // The enums index value is used
            // USD: 208 will equal value to be 0 (when USD is the first option in the enum list)
            return Object.keys(targetEnums).map((key, i = 0) => {
                return {
                    value: i,
                    displayName: key
                };
            });
        }

    }

    public static getFieldOptionsOfFlagEnum(targetEnums: any): SelectFieldOption[] {
        // When using the typescript enum keyword, the enum gets too many props.
        // Code below transform the typescript enum to have same structure as enums generated from swagger code gen.
        const processed = {};
        Object.keys(targetEnums).forEach(key => {
            if (!Number.isInteger(Number(key))) {
                processed[key] = targetEnums[key];
            }
        });
        targetEnums = processed;

        // Convert the enum object into a proper options object for the select field.
        return Object.keys(targetEnums).map(key => {
            return {
                value: targetEnums[key],
                displayName: key
            };
        });
    }
}
