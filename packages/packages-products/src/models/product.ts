import { DocumentRecord } from "@skysmack/framework";

export class Product extends DocumentRecord<number> {
    public id: number;
    public name: string;
    public productTypeId: number;

    public constructor(init?: Partial<Product>) {
        super();
        Object.assign(this, init);
    }
}