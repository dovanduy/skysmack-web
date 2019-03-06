import { Record } from '@skysmack/framework';
import { GetSingleEntityPayload } from './get-single-entity-payload';

export interface GetSingleEntitySuccessPayload<TObject, TKey> extends GetSingleEntityPayload<TKey> {
    entity: TObject;
}