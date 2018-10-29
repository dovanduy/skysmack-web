import { LocalPage } from "./local-page";
import { NumIndex } from "./indexes";

export class LocalPages<TKey> {
    public pages: NumIndex<LocalPage<TKey>>;

    public pageSize: number;
    public sort: string;

    public constructor(init?: Partial<LocalPages<TKey>>) {
        Object.assign(this, init);
    }
}
