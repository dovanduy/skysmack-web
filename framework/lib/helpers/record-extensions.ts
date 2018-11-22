import { Record, LocalObject, LocalObjectStatus, StrIndex } from '../models';

export class RecordExtensions {
    public static mergeOrAddLocalRecords<TRecord extends Record<TKey>, TKey>(existingRecords: StrIndex<LocalObject<TRecord>>, newRecords: LocalObject<TRecord>[], expectedState: LocalObjectStatus = LocalObjectStatus.OK): StrIndex<LocalObject<TRecord>> {
        if (!newRecords || newRecords === null || newRecords.length === 0) {
            return existingRecords;
        }

        if (!existingRecords || existingRecords === null) {
            const index = {} as StrIndex<LocalObject<TRecord>>;
            newRecords.forEach(newRecord => {
                index[newRecord.localId] = newRecord;
            });
            return index;
        }

        newRecords.forEach(newRecord => {
            const existingRecordKey = Object.keys(existingRecords).find(x => existingRecords[x].object.id === newRecord.object.id);
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