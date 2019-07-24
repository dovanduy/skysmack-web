import { PackageType } from '@skysmack/framework';

export const OpenApiTypeId = '09389833-f051-4285-8e38-c71a37f4968d';

export class OpenApiType implements PackageType {
    id = OpenApiTypeId;
    dependencies = [];
}
