import { DocumentRecord } from "@skysmack/framework";

export class ProductType extends DocumentRecord<number> {
    public id: number;
    public name: string;

    public constructor(init?: Partial<ProductType>) {
        super();
        Object.assign(this, init);
    }
}