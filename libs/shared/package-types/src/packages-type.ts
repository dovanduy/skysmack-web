import { PackageType } from '@skysmack/framework';

export const PackagesTypeId = 'eb633f67-076f-4df5-bcad-8c8a8c9fcee8';
export class PackagesType implements PackageType {
    id = PackagesTypeId;
    dependencies = [];
}
