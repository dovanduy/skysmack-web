import { Record } from '@skysmack/framework';
import { GetSingleRecordPayload } from './get-single-record-payload';

export interface GetSingleRecordSuccessPayload<TRecord extends Record<TKey>, TKey> extends GetSingleRecordPayload<TKey> {
    record: TRecord;
}