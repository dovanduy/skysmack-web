import { Record, PageResponse } from '@skysmack/framework';
import { GetPagedEntitiesPayload } from './get-paged-entities-payload';

export interface GetPagedEntitiesSuccessPayload<TObject, TKey> extends GetPagedEntitiesPayload {
    entities: TObject[];
    page: PageResponse<TKey>;
}