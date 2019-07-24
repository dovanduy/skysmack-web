import { PackageType } from '@skysmack/framework';

export const MaintenanceTypeId = '355b7b36-1d39-4590-9f57-b4721b12d50c';

export class MaintenanceType implements PackageType {
  id = MaintenanceTypeId;
  dependencies = [];
}
