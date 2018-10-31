import { GetSingleRecordAction } from './get-single-record-action';
import { Record } from '@skysmack/framework';

export class GetSingleRecordSuccessAction<TRecord extends Record<TKey>, TKey> extends GetSingleRecordAction<TKey> {
  public record: TRecord;
  public test: boolean;

  public constructor(init?: Partial<GetSingleRecordSuccessAction<TRecord, TKey>>) {
    super(init);
    Object.assign(this, init);
  }
}
