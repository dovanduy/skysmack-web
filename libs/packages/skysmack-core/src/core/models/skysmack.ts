import { Package } from '@skysmack/framework';

export class Skysmack {
    public defaultHostName?: string;
    public safeSubHostName?: string;
    public name?: string;
    public packages?: Package[];

    public constructor(init?: Partial<Skysmack>) {
        Object.assign(this, init);
    }
}