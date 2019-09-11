import { SortBuilder } from '../sort/sort-builder';
import { RSQLFilterBuilder } from '../rsql/rsql-filter-builder';

export class RouteQuery {
  fields: string[] = [];
  rsqlFilter: RSQLFilterBuilder = new RSQLFilterBuilder();
  sort: SortBuilder = new SortBuilder();

  public constructor(init?: Partial<RouteQuery>) {
    Object.assign(this, init);
  }
}
