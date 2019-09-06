import { PartnerTenantStatus } from './partner-tenant-status';

export class PartnerTenant {
    public userId: string;
    public tenantId: string;
    public status: PartnerTenantStatus;

    constructor(values: Partial<PartnerTenant>) {
        Object.assign(this, values);
    }
}
