import { Links } from './links';
import { LoadingState } from '../helpers/loading-state';

export class LocalPage<TKey> {
  public ids: TKey[];

  public links: Links;

  public loadingState: LoadingState = LoadingState.Loading;

  public constructor(init?: Partial<LocalPage<TKey>>) {
    Object.assign(this, init);
  }
}
