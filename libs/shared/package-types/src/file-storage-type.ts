import { PackageType } from '@skysmack/framework';

export const FileStorageTypeId = 'eaa8a62f-cbcf-4fb0-b104-d13b3756825a';

export class FileStorageType implements PackageType {
  id = FileStorageTypeId;
  dependencies = [];
}
