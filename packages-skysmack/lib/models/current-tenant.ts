export interface CurrentTenantViewModel {
    defaultHostName?: string;
    safeSubHostName?: string;
    name?: string;
    modules?: Array<any>;
    packages?: Array<any>;
    features?: Array<any>;
    adaptors?: Array<any>;
}