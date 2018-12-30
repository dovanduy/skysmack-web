import { Record, PageResponse } from '@skysmack/framework';
import { GetPagedRecordsPayload } from './get-paged-records-payload';

export interface GetPagedRecordsSuccessPayload<TRecord extends Record<TKey>, TKey> extends GetPagedRecordsPayload {
    records: TRecord[];
    page: PageResponse<TKey>;
}