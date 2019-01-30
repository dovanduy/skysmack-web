import { DocumentRecord } from "@skysmack/framework";

export class Basket extends DocumentRecord<number> {
    public currencyCode: string;

    public constructor(init?: Partial<Basket>) {
        super();
        Object.assign(this, init);
    }
}