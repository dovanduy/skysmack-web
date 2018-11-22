import { LocalObject, Record } from '@skysmack/framework';
import { RecordPayload, PackagePathPayload } from '.';

export interface CancelActionPayload<TRecord extends Record<TKey>, TKey> extends RecordPayload<TRecord, TKey>, PackagePathPayload {
    record: LocalObject<TRecord>;
    packagePath: string;
}