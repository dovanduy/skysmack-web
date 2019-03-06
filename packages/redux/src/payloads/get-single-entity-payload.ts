import { PackagePathPayload } from './package-path-payload';
import { IdPayload } from './id-payload';

export interface GetSingleEntityPayload<TKey> extends PackagePathPayload, IdPayload<TKey> {
}
