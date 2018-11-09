import { SelectFieldOption } from './select-field-option';
import { getProperty } from '@skysmack/framework';

export class FieldHelpers {
    public static getFieldOptionsOfArray(entities: any[], keyProp = 'object.id', valueProp = 'object.name'): SelectFieldOption[] {
        return entities ? entities.map(entity => {
            return {
                value: getProperty(entity, keyProp),
                displayName: getProperty(entity, valueProp)
            };
        }) : [];
    }

    public static getFieldOptionsOfEnum(targetEnums: any, typeScriptEnum = false): SelectFieldOption[] {
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
        return Object.keys(targetEnums).map((key, i = 0) => {
            return {
                value: i,
                displayName: key
            };
        });
    }
}
