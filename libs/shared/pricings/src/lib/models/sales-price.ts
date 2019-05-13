import { Record } from '@skysmack/framework';

export class SalesPrice extends Record<number> {
    public currencyCode: string;
    public price: number;
    public recordId: number;
}
