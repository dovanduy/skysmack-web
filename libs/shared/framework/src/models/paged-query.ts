import { RouteQuery } from './route-query';

export class PagedQuery extends RouteQuery {
  pageNumber = 1;
  pageSize = 50;

  public constructor(init?: Partial<PagedQuery>) {
    super(init);
    Object.assign(this, init);
  }
}
