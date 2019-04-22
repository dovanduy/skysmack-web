import { DocumentRecord } from "@skysmack/framework";

export class InvoiceItem extends DocumentRecord<number> {
    public description: string;
    public order: number;
    public units: number;
    public unitPrice: number;
    public unitDiscount: number;
    public unitTax: number;
    public inventoryId: number;

    public constructor(init?: Partial<InvoiceItem>) {
        super();
        Object.assign(this, init);
    }
}
