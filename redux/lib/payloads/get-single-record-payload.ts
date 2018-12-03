import { PackagePathPayload } from './package-path-payload';
import { IdPayload } from './id-payload';

export interface GetSingleRecordPayload<TKey> extends PackagePathPayload, IdPayload<TKey> {
}
