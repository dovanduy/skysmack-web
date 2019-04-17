import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { ProductType } from "./product-type";

export class Product extends DocumentRecord<number> {
    public id: number;
    public name: string;
    public productTypeId: number;
    public productType: LocalObject<ProductType, number>;
    [key: string]: any;

    public constructor(init?: Partial<Product>) {
        super();
        Object.assign(this, init);
    }
}