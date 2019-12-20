import { jsonPrint } from './framework.helpers';

/**
 * Pipes a series of functions. 
 * Note: Value is provided last like this pipeFns(func1, func2)(value)
 * Taken from https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
 */
export const pipeFns = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

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

/**
 * Returns distinct values.
 * Note: Only works for primitive values.
 */
export const distinct = (array: any[]) => array.filter((value, index, self) => self.indexOf(value) === index);