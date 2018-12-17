import { pipe, of } from 'rxjs';
import { map, filter, flatMap, catchError, tap } from 'rxjs/operators';
import { getProperty } from './framework.helpers';
import { LocalObject } from './../models/local-object';
import { StrIndex, NumIndex } from '../models/indexes';

/**
 * Logs the next value in the stream to the console.
 */
export const log = (...args) => pipe(
    tap((x: any) => {
        args[0] ? args.forEach(y => console.log(y, x)) : console.log(x);
    })
);

/**
 * Filter away undefined values.
*/
export const defined = () => pipe(
    filter((x: any) => x !== undefined)
);

/**
 * Filter away undefined values. Catches errors if any.
 */
export const safeDefined = () => pipe(
    defined(),
    handleError()
);

/**
 * If the value is undefined, return an empty array or object. Otherwise return the value.
 * Catches errors if any.
 * @param type Set if the returned values should be an empty object or array.
 */
export const safeUndefinedTo = (type: 'array' | 'object') => pipe(
    map(x => x === undefined ? (type === 'array' ? [] : {}) : x),
    handleError()
);

/**
 * Filter away null values.
*/
export const notNull = <T>() => pipe(
    defined(),
    filter<T>((x: any) => x !== null)
);

/**
 * Filters away all empty arrays or objects without any properties/keys.
 */
export const notEmpty = <T>() => pipe(
    filter<T>((x: any) => Array.isArray(x) ? x.length > 0 : Object.keys(x).length > 0),
);

/**
 * Filters away values that are undefined, null, or empty arrays/objects.
 */
export const hasValue = <T>() => pipe(
    notNull(),
    notEmpty<T>()
);

/**
 * Filters away values that are undefined, null, or empty arrays/objects.
 * Catches errors if any.
 */
export const safeHasValue = () => pipe(
    hasValue(),
    handleError()
);

/**
 * Extracts a value from a dictionary. If no matching value is found, the original value is returned.
 * @param dictionaryKey Key (property name) for the value to extract.
 */
export const extractIfDictionary = (dictionaryKey) => pipe(
    map(values => dictionaryKey ? values[dictionaryKey] : values)
);

/**
 * Flattens an array, so the stream becomes individual objects instead of one array.
 */
export const flatten = <T>() => pipe(
    flatMap<T[], T>((x: any[]) => x)
);

/**
 * Puts a value into an array if it isn't already an array itself.
 */
export const ensureIsArray = () => pipe(
    map((x: any) => Array.isArray(x) ? x : [x])
);

/**
 *
 * @param id The id of the object.
 * @param idSelector . seperated selector for the id. Used to find nested ids. E.g. "id" or "someProp.id"
 */
export const filterById = (id: any, idSelector: string) => pipe(
    hasValue(),
    map((collection: LocalObject<any>[]) => collection.filter(entity => getProperty(entity, idSelector) !== undefined)
        .filter(entity => getProperty(entity, idSelector).toString() === id.toString())[0]
    ),
);

/**
 * Catches errors in the stream, preventing a program crash. Returns a stream of the error.
 */
export const handleError = () => pipe(
    catchError((error) => of(error))
);

/**
 * Error handler for epics, returning a proper action for redux to process.
 */
export const handleEpicError = (type) => pipe(
    catchError((error) => of({
        type,
        payload: error,
        error: true
    }))
);

/**
 * Puts all dictionary values into an array.
 */
export const dictionaryToArray = <TValue>() => pipe(
    map<StrIndex<TValue> | NumIndex<TValue>, TValue[]>(x => Object.keys(x).map(key => x[key]))
);
