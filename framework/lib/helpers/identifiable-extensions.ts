import { LocalObject, LocalObjectStatus, StrIndex, Identifiable } from '../models';

export class IdentifiableExtensions {
    public static mergeOrAddLocal<TIdentifiable extends Identifiable<TKey>, TKey>(existingRecords: StrIndex<LocalObject<TIdentifiable, TKey>>, newRecords: LocalObject<TIdentifiable, TKey>[], expectedState: LocalObjectStatus = LocalObjectStatus.OK): StrIndex<LocalObject<TIdentifiable, TKey>> {
        if (!newRecords || newRecords === null || newRecords.length === 0) {
            return existingRecords;
        }

        if (!existingRecords || existingRecords === null) {
            const index = {} as StrIndex<LocalObject<TIdentifiable, TKey>>;
            newRecords.forEach(newRecord => {
                index[newRecord.localId] = newRecord;
            });
            return index;
        }

        newRecords.forEach(newRecord => {
            const existingRecordKey = Object.keys(existingRecords).find(x => existingRecords[x].object.identifier === newRecord.object.identifier);
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