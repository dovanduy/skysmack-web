import { DocumentRecord } from "@skysmack/framework";

export class ProductType implements DocumentRecord<number> {
    public id: number;
    public name: string;
    [key: string]: any;

    public constructor(init?: Partial<ProductType>) {
        Object.assign(this, init);
    }
}