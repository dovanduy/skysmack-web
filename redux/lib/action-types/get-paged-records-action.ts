import { PagedQuery } from 'skysmack-framework';
import { PackageAction } from './package-action';

export class GetPagedRecordsAction implements PackageAction {
  type: string;

  packagePath: string;
  pagedQuery: PagedQuery;

  public constructor(init?: Partial<GetPagedRecordsAction>) {
    Object.assign(this, init);
  }
}
