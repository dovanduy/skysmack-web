import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getProperty } from './framework.helpers';
import { LocalObject } from 'lib/models/local-object';
import { LocalObjectStatus } from 'lib/models/local-object-status';

export class ArrayHelpers {
    /**
     * Adds a value to an array.
     * @param targetArray Array to add the value to.
     * @param value Value to add.
     */
    public static putArrayImmutable(targetArray: any[], value: any) {
        return [...targetArray, value];
    }

    /**
     * Removes value from the array.
     * @param targetArray Array to remove the value to.
     * @param value Value to remove.
     * @param compareValue Dot notated path to the property value used for filtering the value away. Defaults to 'localId'
     */
    public static pluckArrayImmutable(targetArray: any[], value: any, compareValue: string = 'localId') {
        return targetArray.filter(item => getProperty(item, compareValue) !== getProperty(value, compareValue));
    }

    /**
     * Combine two arrays and remove items where supplied compare value matches.
     * Note: Left array items are overwritten by newArray items on match.
     * @param array Local items. Items are overwritten on value match.
     * @param newArray Server items. Are kept in final array on match.
     * @param compareValue Path to property value used for matching objects. Defaults to id.
     */
    public static mergeArraysImmutable(array: any[], newArray: any[], compareValue: string = 'id'): any[] {
        if (array.length <= 0) {
            return newArray;
        }

        return this.removeArrayDuplicatesImmutable([...array, ...newArray], compareValue);
    }

    /**
     * Removes items from an array where two items share the same supplied compare value.
     * @param array Array to remove duplicates from
     * @param compareValue Path to the property with the value to use for comparison. Defaults to id,
     */
    public static removeArrayDuplicatesImmutable(array: any[], compareValue: string = 'id'): any[] {
        // Original snippet from https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
        return array.filter((item, index, self) => self.findIndex(t => getProperty(t, compareValue) === getProperty(item, compareValue)) === index);
    }

    public static addToStreamArray(entities$: Observable<any>, newEntities: any[], compareValue: string): Observable<any> {
        return entities$.pipe(map((entities: any[]) => this.mergeArraysImmutable(entities, newEntities, compareValue)));
    }

    /**
     * Combine two LocalObject arrays and remove items where supplied compare value matches.
     * Note 1: localArray array item is overwritten by serverArray array item on match.
     * Note 2: LocalObjects without ok status will always be added.
     * @param localArray Local items. Items are overwritten on value match.
     * @param serverArray Server items. Are kept in final array on match.
     * @param compareValue Path to property value used for matching objects. Defaults to object.id.
     */
    public static mergeLocalObjectArraysImmutable(localArray: LocalObject<any>[], serverArray: LocalObject<any>[], compareValue: string = 'object.id', keepNew: boolean = false): any[] {
        if (localArray.length <= 0) {
            return serverArray;
        }
        if (serverArray.length <= 0) {
            return localArray;
        }

        serverArray.forEach(serverEntity => {
            const index = localArray.findIndex(entity => getProperty(entity, compareValue) === getProperty(serverEntity, compareValue));
            if (index >= 0) {
                const entity = localArray[index];
                if (keepNew) {
                    serverEntity.isNew = entity.isNew;
                }

                if (entity.status === LocalObjectStatus.OK) {
                    localArray.splice(index, 1);
                    localArray.push(serverEntity);
                }
            } else {
                localArray.push(serverEntity);
            }
        });

        return localArray;
    }
}
