import { GetPagedRecordsAction } from "./get-paged-records-action";

export class GetPagedRecordsFailureAction extends GetPagedRecordsAction {
    public constructor(init?: Partial<GetPagedRecordsFailureAction>) {
      super(init);
      Object.assign(this, init);
    }
  }
  