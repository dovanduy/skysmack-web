import { Links } from "./links";

export class LocalPage<TKey> {
  public ids: TKey[];

  public pageNumber: number;
  public links: Links;

  public constructor(init?: Partial<LocalPage<TKey>>) {
    Object.assign(this, init);
  }
}
