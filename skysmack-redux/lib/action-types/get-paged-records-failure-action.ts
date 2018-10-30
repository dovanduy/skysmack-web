import { GetPagedRecordsAction } from "./get-paged-records-action";

export class GetPagedRecordsFailureAction extends GetPagedRecordsAction {
  // TODO: Give error proper type
  public error: any;

  public constructor(init?: Partial<GetPagedRecordsFailureAction>) {
    super(init);
    Object.assign(this, init);
  }
}
