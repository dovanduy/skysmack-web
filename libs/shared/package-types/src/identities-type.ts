import { PackageType } from '@skysmack/framework';

export const IdentitiesTypeId = 'e05c2897-7d84-46b5-876a-290d1105c7fc';

export class IdentitiesType implements PackageType {
    id = IdentitiesTypeId;
    dependencies = [];
}