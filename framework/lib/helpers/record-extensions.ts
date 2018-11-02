import { Record, LocalObject, LocalObjectStatus } from '../models';

export class RecordExtensions {

    public static mergeOrAddLocalRecords<TRecord extends Record<TKey>, TKey>(existingRecords: LocalObject<TRecord>[], newRecords: LocalObject<TRecord>[]): LocalObject<TRecord>[] {
        if (!newRecords || newRecords === null || newRecords.length === 0) {
            return existingRecords;
        }

        if (!existingRecords || existingRecords === null || existingRecords.length === 0) {
            return newRecords;
        }

        newRecords.forEach(newRecord => {
            const existingRecord = existingRecords.find(x => x.object.Id === newRecord.object.Id);
            if (existingRecord) {
                if (existingRecord.status === LocalObjectStatus.OK) {
                    existingRecord.object = newRecord.object;
                }
            } else {
                existingRecords.push(newRecord);
            }
        });

        return existingRecords;
    }
}