import { Record, LocalObject, LocalObjectStatus, StrIndex } from '../models';

export class RecordExtensions {

    public static mergeOrAddLocalRecords<TRecord extends Record<TKey>, TKey>(existingRecords: StrIndex<LocalObject<TRecord>>, newRecords: LocalObject<TRecord>[]): StrIndex<LocalObject<TRecord>> {
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
            const existingRecord = Object.keys(existingRecords).find(x => existingRecords[x].object.id === newRecord.object.id);
            if (existingRecord) {
                if (existingRecords[existingRecord].status === LocalObjectStatus.OK) {
                    existingRecords[existingRecord].object = newRecord.object;
                }
            } else {
                existingRecords[newRecord.localId] = newRecord;
            }
        });

        return existingRecords;
    }
}