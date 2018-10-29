import { PackageAction } from './package-action';

export class GetSingleRecordAction<TKey> implements PackageAction {
  type: string;

  packagePath: string;
  id: TKey;

  public constructor(init?: Partial<GetSingleRecordAction<TKey>>) {
    Object.assign(this, init);
  }
}
