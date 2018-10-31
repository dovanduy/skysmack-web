import { LocalPages } from "./local-pages";
import { StrIndex } from "./indexes";

export class LocalPageTypes<TKey> {
    public pages: StrIndex<LocalPages<TKey>>;

    public totalCount: number;
    public query: string;

    public constructor(init?: Partial<LocalPageTypes<TKey>>) {
        Object.assign(this, init);
    }
}
