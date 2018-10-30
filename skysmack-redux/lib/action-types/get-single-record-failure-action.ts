import { GetSingleRecordAction } from './get-single-record-action';

export class GetSingleRecordFailureAction<TKey> extends GetSingleRecordAction<TKey> {
  // TODO: Give error proper type
  public error: any;

  public constructor(init?: Partial<GetSingleRecordFailureAction<TKey>>) {
    super(init);
    Object.assign(this, init);
  }
}
