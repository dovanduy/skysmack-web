import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { InvoiceItem } from './invoice-item';

export class Invoice extends DocumentRecord<number> {
    public currencyCode: number;
    public invoiceItems: LocalObject<InvoiceItem, number>;

    public constructor(init?: Partial<Invoice>) {
        super();
        Object.assign(this, init);
    }
}