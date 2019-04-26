import { Record } from '@skysmack/framework';

export class SalesPrice extends Record<number> {
    public currencyCode: string;
    public price: number;
    // TODO: Refactor this into typeId when type in backend is fixed.
    public recordId: number;
}
