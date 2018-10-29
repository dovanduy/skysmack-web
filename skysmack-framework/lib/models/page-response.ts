import { Links } from "./links";

export class PageResponse<TKey> {
    public ids: TKey[];

    public totalCount: number;
    public query: string;

    public pageSize: number;
    public sort: string;

    public pageNumber: number;
    public links: Links;

    public constructor(init?: Partial<PageResponse<TKey>>) {
        Object.assign(this, init);
    }
}
