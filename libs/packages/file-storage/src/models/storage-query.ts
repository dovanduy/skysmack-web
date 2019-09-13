export class StorageQuery {
    public prefix: string;
    public delimiter: string;
    public includeTrailingDelimiter: boolean;
    public pageNumber: number;
    public pageSize: number;
    public query: string;

    constructor(values?: Partial<StorageQuery>) {
        Object.assign(this, values);
    }
}
