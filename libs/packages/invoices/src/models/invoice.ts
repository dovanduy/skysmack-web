import { DocumentRecord } from "@skysmack/framework";

export class Invoice extends DocumentRecord<number> {
    public currencyCode: number;

    public status: 'draft' | 'processing' | 'invoiced';
    public paid: boolean;
    public total: number;
    public totalTax: number;
    public balance: number;
    public itemIds: number[];
    public paymentIds: number[];

    public constructor(init?: Partial<Invoice>) {
        super();
        Object.assign(this, init);
    }
}
