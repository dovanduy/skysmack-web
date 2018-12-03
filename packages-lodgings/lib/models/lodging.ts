import { DocumentRecord } from "@skysmack/framework";

export class Lodging implements DocumentRecord<number> {
    public id: number;
    public name: string;
    public productTypeId: number;
    [key: string]: any;

    public constructor(init?: Partial<Lodging>) {
        Object.assign(this, init);
    }
}