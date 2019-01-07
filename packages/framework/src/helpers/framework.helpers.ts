import { Guid } from 'guid-typescript';
import { LocalObject } from '../models/local-object';
import { LocalObjectStatus } from '../models/local-object-status';

/**
 * TAKEN FROM: https://gist.github.com/jasonrhodes/2321581
 * A function to take a string written in dot notation style, and use it to
 * find a nested object property inside of an object.
 *
 * Useful in a plugin or module that accepts a JSON array of objects, but
 * you want to let the user specify where to find various bits of data
 * inside of each custom object instead of forcing a standardized
 * property list.
 *
 * @param Object The object to search
 * @param String nested dot notation style parameter reference (ie "urls.small")
 *
 * @return the value of the property in question
 */
export const getProperty = (object: any, path: string, noThrowOn: string[] = ['id', 'key']) => {
    const parts = path.split('.');
    const length = parts.length;
    let property = object || this;

    for (let i = 0; i < length; i++) {
        property = property[parts[i]];
        if (property === undefined) {
            if (!noThrowOn.includes(parts[i])) {
                const message = `Target property is undefined. Selector path "${path}" is incorrect. Check for case sensitivity and spelling errors.
---
Object
---
${JSON.stringify(object, null, 2)}
`;
                throw new Error(message);
            }
        }
    }

    return property;
};

/**
 * Creates a dot notated string based on supplied key and values.
 * @param key The key for the area e.g. INSTALLED_PACKAGES_KEY
 * @param values Optiontal extra values. Each value will be appended with a .
 */
export const setKey = (key: string, values: any[] = []): string => {
    return values.length > 0 ? key + '.' + values.filter(x => x !== null && x !== undefined).join('.') : key;
};

/**
 * Wraps object with an local object.
 */
export const toLocalObject = <TObject, TKey>(
    object: TObject,
    identifier: string = 'id',
    localId: string = Guid.create().toString(),
    status: LocalObjectStatus = LocalObjectStatus.OK,
    modifyType: string = null,
    isNew: boolean = false,
    foreignKey: any = null,
    error: any = null,
): LocalObject<TObject, TKey> => {
    return new LocalObject<TObject, TKey>({ object, identifier, localId, status, modifyType, isNew, foreignKey, error });
};

export const isObject = (value) => {
    return value && typeof value === 'object' && value.constructor === Object;
};

/**
 * Checks if a strings content is an integer. If it is, it returns the int as a number.
 * Otherwise the string is returned.
 */
export const stringIntToInt = (value: any) => {
    if (!Array.isArray(value) && Number.isInteger(Number(value))) {
        return Number(value);
    } else {
        return value;
    }
};
