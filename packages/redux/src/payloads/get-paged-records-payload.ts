import { PackagePathPayload } from './package-path-payload';
import { PagedQuery } from '@skysmack/framework';

export interface GetPagedRecordsPayload extends PackagePathPayload {
    pagedQuery: PagedQuery;
}
