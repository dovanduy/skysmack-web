import { LocalPage } from "./local-page";
import { StrIndex, NumIndex } from "./indexes";

export class LocalPageTypes<TKey> {
    public pages: StrIndex<NumIndex<LocalPage<TKey>>> = {};
    public totalCount: number;

    public constructor(init?: Partial<LocalPageTypes<TKey>>) {
        Object.assign(this, init);
    }
}
