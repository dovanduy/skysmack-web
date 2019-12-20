import { jsonPrint } from './framework.helpers';

/**
 * Flattens a multi-dimensional (jagged) array.
 */
export const flattenArray = (array: any[][]): any[] => {
    return array.reduce((a, b) => a.concat(b), []);
};

/**
 * Filters away null and undefined values.
 */
export const onlyDefined = (array: any[]): any[] => {
    return array.filter(x => x !== undefined && x !== null);
};

/**
 * Joins a string array with a given value.
 */
export const join = (combineValue: string): (array: string[]) => string => {
    return (array: string[]) => array.join(combineValue);
};


/**
 * Returns an array of all property values on an object.
 */
export const getValues = (value: any): any[] => Object.values(value);

/**
 * Json prints a value, then returns it.
 */
export const print = (value: any) => {
    jsonPrint(value);
    return value;
};
