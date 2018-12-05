import { Package } from './package';

export interface Skysmack {
    defaultHostName?: string;
    safeSubHostName?: string;
    name?: string;
    packages?: Package[];
}