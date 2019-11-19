import { PackageType } from '@skysmack/framework';

export const WebhooksTypeId = '088043f5-0fe4-4508-a660-bf4eb80d317c';

export class WebhooksType implements PackageType {
  id = WebhooksTypeId;
  dependencies = [];
}
