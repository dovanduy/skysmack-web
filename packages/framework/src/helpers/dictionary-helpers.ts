import { StrIndex } from './../models';
import { getProperty } from './framework.helpers';
import { ArrayHelpers } from './array-helpers';

export class DictionaryHelpers {
    /**
     * Adds item to array contained inside a dictionary.
     * @param dictionary Dictionary with arrays as values.
     * @param key Key for the target array
     * @param value Item to add to target array.
     */
    public static putDictionaryCollectionImmutable(dictionary: StrIndex<any[]>, key: string, value: any): StrIndex<any> {
        if (value === undefined) {
            return dictionary;
        }

        const clonedDictionary = {
            ...dictionary
        };

        const collection = clonedDictionary[key];


        if (collection === undefined) {
            Array.isArray(value) ? clonedDictionary[key] = value : clonedDictionary[key] = [value];
        } else {
            clonedDictionary[key].push(value);
        }

        return clonedDictionary;
    }

    /**
     * Removes item from array contained inside a dictionary.
     * @param dictionary Dictionary with arrays as values.
     * @param key Key for the target array
     * @param value Item to add to target array.
     * @param compareValue Dot notated path to the property value used for filtering the value away. Defaults to 'localId'
     */
    public static pluckDictionaryCollectionImmutable(dictionary: StrIndex<any[]>, key: string, value: any, compareValue: string = 'localId'): StrIndex<any> {
        if (value === undefined) {
            return dictionary;
        }

        const clonedDictionary = {
            ...dictionary
        };

        if (clonedDictionary[key] !== undefined) {
            clonedDictionary[key] = clonedDictionary[key].filter(item => getProperty(item, compareValue) !== getProperty(value, compareValue));
        }

        return clonedDictionary;
    }

    /**
     * Merges the provided values array with the array found in the dictionary.
     * Note that on compare value match, the item in the dictionary will be overwritten by the value in the values array.
     * @param dictionary A dictionary containing arrays as its values.
     * @param key Key for the targeted array to merge values into.
     * @param values New values to add to the targeted array in the dictionary.
     * @param compareValue Path to the property to use for object comparison.
     */
    public static mergeDictionaryCollectionImmutable(dictionary: StrIndex<any[]>, key: string, values: any[], keepNew: boolean = false): StrIndex<any> {
        if (values === undefined) {
            return dictionary;
        }

        const clonedDictionary = {
            ...dictionary
        };

        const collection = clonedDictionary[key];

        if (collection === undefined) {
            clonedDictionary[key] = values;
        } else {
            clonedDictionary[key] = ArrayHelpers.mergeLocalObjectArraysImmutable(collection, values, keepNew);
        }

        return clonedDictionary;
    }
}
