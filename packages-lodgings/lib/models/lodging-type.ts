import { DocumentRecord } from "@skysmack/framework";

export class LodgingType implements DocumentRecord<number> {
    public id: number;
    public name: string;

    public constructor(init?: Partial<LodgingType>) {
        Object.assign(this, init);
    }
}