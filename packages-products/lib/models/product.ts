import { DocumentRecord } from "@skysmack/framework";

export class Product implements DocumentRecord<number> {
    public id: number;
    public firstName: string;
    public lastName: string;
    public displayName: string;
    [key: string]: any;

    public constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}