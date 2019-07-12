import { DocumentRecord } from "@skysmack/framework";

export class Receipt extends DocumentRecord<number> {
    public constructor(init?: Partial<Receipt>) {
        super();
        Object.assign(this, init);
    }
}
