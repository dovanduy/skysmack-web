import { PackageType } from '@skysmack/framework';

export const PersonsTypeId = '38ffd3ad-91a8-44d4-a71a-fd2f478ebd18';

export class PersonsType implements PackageType {
  id = PersonsTypeId;
  dependencies = [];
}
