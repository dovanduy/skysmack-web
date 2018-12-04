import { DocumentRecord } from "@skysmack/framework";

export class Product implements DocumentRecord<number> {
    public id: number;
    public name: string;
    public productTypeId: number;

    public constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}