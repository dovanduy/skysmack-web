import { DocumentRecord } from "@skysmack/framework";

export class Invoice extends DocumentRecord<number> {
    public currencyCode: number;

    public constructor(init?: Partial<Invoice>) {
        super();
        Object.assign(this, init);
    }
}