import { PackagePathPayload } from './package-path-payload';
import { Record } from '@skysmack/framework';

export class AddRecordsPayload<TRecord extends Record<TKey>, TKey> implements PackagePathPayload {
    public records: TRecord[];
    public packagePath: string;
}
