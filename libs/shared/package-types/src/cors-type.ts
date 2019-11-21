import { PackageType } from '@skysmack/framework';

export const CorsTypeId = '4b36c8aa-4756-4507-919e-77af61cceaf4';

export class CorsType implements PackageType {
  id = CorsTypeId;
  dependencies = [];
}
