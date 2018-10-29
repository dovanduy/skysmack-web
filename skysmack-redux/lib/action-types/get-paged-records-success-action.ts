import { GetPagedRecordsAction } from "./get-paged-records-action";
import { Record, PageResponse } from 'skysmack-framework';

export class GetPagedRecordsSuccessAction<TRecord extends Record<TKey>, TKey> extends GetPagedRecordsAction {
    public records: TRecord[];
    public page: PageResponse<TKey>;
    
    public constructor(init?: Partial<GetPagedRecordsSuccessAction<TRecord, TKey>>) {
      super(init);
      Object.assign(this, init);
    }
  }