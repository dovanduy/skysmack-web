import { RouteQuery } from './route-query';

export class LimitQuery extends RouteQuery {
  limit = 1;

  public constructor(init?: Partial<LimitQuery>) {
    super(init);
    Object.assign(this, init);
  }
}
