import { DocumentRecord } from "@skysmack/framework";

export class InvoicePayment extends DocumentRecord<number> {
    public description: string;
    public source: number;
    public amount: number;
    public ip: number;
    public inventoryId: number;

    public constructor(init?: Partial<InvoicePayment>) {
        super();
        Object.assign(this, init);
    }
}
