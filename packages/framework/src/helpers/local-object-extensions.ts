import { LocalObject, LocalObjectStatus, StrIndex } from '../models';

export class LocalObjectExtensions {
    public static mergeOrAddLocal<TObject, TKey>(existingRecords: StrIndex<LocalObject<TObject, TKey>>, newRecords: LocalObject<TObject, TKey>[], expectedState: LocalObjectStatus = LocalObjectStatus.OK): StrIndex<LocalObject<TObject, TKey>> {
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
                    existingRecords[existingRecordKey] = newRecord;
                }
            } else {
                existingRecords[newRecord.localId] = newRecord;
            }
        });

        return existingRecords;
    }
}