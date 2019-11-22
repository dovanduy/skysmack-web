import { Tenant } from './tenant';
import { Package } from '@skysmack/framework';
import { Owner } from './owner';

export class InstallTenant extends Tenant {
    public owners: Owner[];
    public packages: Package[];

    constructor(values?: Partial<InstallTenant>) {
        super(values);
        Object.assign(this, values);
    }
}
