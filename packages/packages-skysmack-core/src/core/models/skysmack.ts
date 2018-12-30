import { Package } from '@skysmack/framework';

export interface Skysmack {
    defaultHostName?: string;
    safeSubHostName?: string;
    name?: string;
    packages?: Package[];
}