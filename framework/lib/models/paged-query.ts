import { SortBuilder } from "../sort/sort-builder";
import { RSQLFilterBuilder } from '../rsql/rsql-filter-builder';

export class PagedQuery {    
  pageNumber = 1;
  pageSize = 50;
  rsqlFilter: RSQLFilterBuilder;
  sort: SortBuilder;

  public constructor(init?: Partial<PagedQuery>) {
      Object.assign(this, init);
  }
}
