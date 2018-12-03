import { DocumentRecord } from "@skysmack/framework";

export class LodgingTypes implements DocumentRecord<number> {
    public id: number;
    public name: string;
    public productTypeId: number;
    [key: string]: any;

    public constructor(init?: Partial<LodgingTypes>) {
        Object.assign(this, init);
    }
}