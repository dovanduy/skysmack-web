import { GetSingleRecordAction } from './get-single-record-action';

export class GetSingleRecordFailureAction<TKey> extends GetSingleRecordAction<TKey> {
  public error: any;

  public constructor(init?: Partial<GetSingleRecordFailureAction<TKey>>) {
    super(init);
    Object.assign(this, init);
  }
}
