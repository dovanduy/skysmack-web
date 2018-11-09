import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Dictionary } from 'framework/models/dictionary';
import { BaseState } from 'framework/redux/base-reducer';
import { GetSuccessAction } from 'framework/redux/types/get-success-action';
import { Page } from 'framework/pagination/page';
import { getProperty, toLocalObject } from 'framework/helpers/framework.helpers';
import { ArrayHelpers } from 'framework/helpers/array-helpers';
import { PatchAction } from 'framework/redux/types/patch-action';
import { LocalObjectStatus } from 'framework/models/local-object-status';

export class DictionaryHelpers {
    /**
     * Sets provided value for specified key. If value is undefined, nothing is set, and the same dictionary is returned.
     * @param dictionary The dictionary to set the value on.
     * @param key Key name.
     * @param value Value to set.
     */
    public static setDictionaryImmutable(dictionary: Dictionary<any>, key: string, value: any): Dictionary<any> {
        if (value === undefined) {
            return dictionary;
        }

        const clonedDictionary = {
            ...dictionary
        };

        clonedDictionary[key] = value;

        return clonedDictionary;
    }

    public static setPageDictionaryImmutable(state: BaseState, action: GetSuccessAction<any>): Dictionary<any> {
        const page: Page = action.payload.page;
        const pages = { ...state.pages };
        pages[page.key] = {
            ...pages[page.key],
            ...DictionaryHelpers.setDictionaryImmutable(state.pages[page.pagination.xPageNumber], page.pagination.xPageNumber.toString(), page)
        };
        return pages;
    }

    /**
     * Adds item to array contained inside a dictionary.
     * @param dictionary Dictionary with arrays as values.
     * @param key Key for the target array
     * @param value Item to add to target array.
     */
    public static putDictionaryCollectionImmutable(dictionary: Dictionary<any[]>, key: string, value: any): Dictionary<any> {
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
    public static pluckDictionaryCollectionImmutable(dictionary: Dictionary<any[]>, key: string, value: any, compareValue: string = 'localId'): Dictionary<any> {
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
    public static mergeDictionaryCollectionImmutable(dictionary: Dictionary<any[]>, key: string, values: any[], compareValue: string = 'object.id', keepNew: boolean = false): Dictionary<any> {
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
            clonedDictionary[key] = ArrayHelpers.mergeLocalObjectArraysImmutable(collection, values, compareValue, keepNew);
        }

        return clonedDictionary;
    }

    /**
     * Patches a target dictionary from state with action values.
     * @param target Target dictionary. Key values must be arrays of LocalObjects.
     * @param patchType The kind of patch to apply. Valid values: success, rollback, remove-success.
     * @param action The patch action with needed values to patch the object.
     */
    public static patchDictionaryImmutable(target: Dictionary<any[]>, patchType: string, action: PatchAction<any>, newEntity: boolean = false): Dictionary<any[]> {
        const targetClone = {
            ...target
        };

        switch (patchType) {
            case 'success':
                const successPatchAction = action as PatchAction<HttpResponse<any>>;
                const body = successPatchAction.payload.body;
                Array.isArray(body) ? body.forEach(entity => DictionaryHelpers.patchOrAddEntity(targetClone, successPatchAction, entity, newEntity)) : DictionaryHelpers.patchOrAddEntity(targetClone, successPatchAction, body, newEntity);
                break;
            case 'rollback':
                const rollBackPatchAction = action as PatchAction<HttpErrorResponse>;
                const updateItem = targetClone[rollBackPatchAction.meta.packageKey].find(item => item.localId === rollBackPatchAction.meta.targetId);
                updateItem.status = LocalObjectStatus.ERROR;
                updateItem.error = rollBackPatchAction.payload;
                break;
            case 'remove-success':
                const removePatchAction = action as PatchAction<HttpResponse<any>>;
                targetClone[removePatchAction.meta.packageKey] = targetClone[removePatchAction.meta.packageKey].filter(item => item.localId !== removePatchAction.meta.targetId);
                break;
            default:
                console.log(`PatchType "${patchType}" is not a valid. Check spelling and case sensitivity`);
                break;
        }

        return targetClone;
    }



    private static patchOrAddEntity(targetClone: { [x: string]: any[]; }, successPatchAction: PatchAction<HttpResponse<any>>, body: any, newEntity: boolean) {
        if (!targetClone[successPatchAction.meta.packageKey]) {
            targetClone[successPatchAction.meta.packageKey] = [];
        }

        const updateItem = targetClone[successPatchAction.meta.packageKey].find(item => item.localId === successPatchAction.meta.targetId);
        if (updateItem) {
            updateItem.object = body;
            updateItem.status = LocalObjectStatus.OK;
            if (newEntity) {
                updateItem.isNew = true;
            }
        } else {
            const item = body;
            item.isNew = newEntity ? true : item.isNew;
            targetClone[successPatchAction.meta.packageKey].push(toLocalObject(item));
        }
    }
}
