import { LocalObject, LocalObjectStatus, StrIndex } from '../models';
import { GlobalProperties } from '../global-properties';

export class LocalObjectExtensions {
    public static mergeOrAddLocal<TObject, TKey>(existingRecords: StrIndex<LocalObject<TObject, TKey>>, newRecords: LocalObject<TObject, TKey>[], expectedState: LocalObjectStatus = LocalObjectStatus.OK, preserveIsNew: boolean = false): StrIndex<LocalObject<TObject, TKey>> {
        if (!newRecords || newRecords === null || newRecords.length === 0) {
            return existingRecords;
        }

        if (!existingRecords || existingRecords === null) {
            const index = {} as StrIndex<LocalObject<TObject, TKey>>;
            newRecords.forEach(newRecord => {
                index[newRecord.localId] = newRecord;
            });
            return index;
        }

        newRecords.forEach(newRecord => {
            const existingRecordKey = Object.keys(existingRecords).find(x => {
                if (existingRecords[x].objectIdentifier === undefined || newRecord.objectIdentifier === undefined) {
                    return false;
                }
                return existingRecords[x].objectIdentifier === newRecord.objectIdentifier;
            });


            if (existingRecordKey) {
                if (existingRecords[existingRecordKey].status === expectedState) {
                    newRecord.localId = existingRecordKey;

                    if (preserveIsNew) {
                        newRecord.isNew = existingRecords[existingRecordKey].isNew;
                    }

                    newRecord.object = { ...existingRecords[existingRecordKey].object, ...newRecord.object };
                    existingRecords[existingRecordKey] = newRecord;
                } else {
                    if (!GlobalProperties.production) {
                        console.log(`Existing record status ${existingRecords[existingRecordKey].status} did not match expected state ${expectedState}`)
                    }
                }
            } else {
                existingRecords[newRecord.localId] = newRecord;
            }
        });

        return existingRecords;
    }
}