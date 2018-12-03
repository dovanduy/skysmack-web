import { DocumentRecord } from "@skysmack/framework";

export class ProductType implements DocumentRecord<number> {
    public id: number;
    public name: string;
    public productTypeId: number;
    [key: string]: any;

    public constructor(init?: Partial<ProductType>) {
        Object.assign(this, init);
    }
}