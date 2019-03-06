import { PackagePathPayload } from './package-path-payload';
import { PagedQuery } from '@skysmack/framework';

export interface GetPagedEntitiesPayload extends PackagePathPayload {
    pagedQuery: PagedQuery;
}
