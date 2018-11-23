import { Links } from "./links";

export class LocalPage<TKey> {
  public ids: TKey[];

  public links: Links;

  public loadingState: 'OK' | 'loading' | 'reloading' | 'notFound' | 'unauthorized' | 'unauthenticated' = 'loading';

  public constructor(init?: Partial<LocalPage<TKey>>) {
    Object.assign(this, init);
  }
}
