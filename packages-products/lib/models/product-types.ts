import { DocumentRecord } from "@skysmack/framework";

export class ProductTypes implements DocumentRecord<number> {
    public id: number;
    public name: string;
    public productTypeId: number;
    [key: string]: any;

    public constructor(init?: Partial<ProductTypes>) {
        Object.assign(this, init);
    }
}