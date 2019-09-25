import { DocumentRecord } from "@skysmack/framework";

export class InvoiceItem extends DocumentRecord<number> {
    public description: string;
    public order: number;
    public units: number;
    public unitPrice: number;
    public unitChange: number;
    public taxPercent: number;
    public inventoryId: number;

    //     unitDiscount -> UnitChange
    // unitTax -> TaxPercent

    public constructor(init?: Partial<InvoiceItem>) {
        super();
        Object.assign(this, init);
    }
}
