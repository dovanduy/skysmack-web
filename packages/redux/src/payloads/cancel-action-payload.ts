import { LocalObject, Record } from '@skysmack/framework';
import { RecordPayload } from './record-payload';
import { PackagePathPayload } from './package-path-payload';

export interface CancelActionPayload<TRecord extends Record<TKey>, TKey> extends RecordPayload<TRecord, TKey>, PackagePathPayload {
    record: LocalObject<TRecord, TKey>;
    packagePath: string;
}