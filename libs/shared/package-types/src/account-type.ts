import { PackageType } from '@skysmack/framework';

export const AccountTypeId = '43276b79-265d-47d3-975b-a1d7689cba69';

export class AccountType implements PackageType {
    id = AccountTypeId;
    dependencies = [];
}