import { PackageType } from '@skysmack/framework';

export const SiteMinderTypeId = '20d09d2e-8ce2-4aad-9d85-cf4b57d8adde';

export class SiteMinderType implements PackageType {
  id = SiteMinderTypeId;
  dependencies = [];
}
