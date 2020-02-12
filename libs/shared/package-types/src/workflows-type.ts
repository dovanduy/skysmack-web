import { PackageType } from '@skysmack/framework';

export const WorkflowsTypeId = 'b89b2ed2-f763-4a50-83df-b23bf7f257e1';

export class WorkflowsType implements PackageType {
  id = WorkflowsTypeId;
  dependencies = [];
}
