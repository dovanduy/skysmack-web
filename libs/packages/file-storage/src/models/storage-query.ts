import { PagedQuery } from '@skysmack/framework';

export class StorageQuery extends PagedQuery {
    public prefix: string;
    public delimiter: string;
    public includeTrailingDelimiter: boolean;

    // Used with local pagination
    public query: string;

    constructor(values?: Partial<StorageQuery>) {
        super(values);
    }
}
