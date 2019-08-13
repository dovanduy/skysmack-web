import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { InvoiceItem } from './invoice-item';

export class Invoice extends DocumentRecord<number> {
    public description: string;
    public currencyCode: number;
    public invoiceItems: LocalObject<InvoiceItem, number>;

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
