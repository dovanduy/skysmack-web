import { DocumentRecord } from "@skysmack/framework";

export class LodgingType extends DocumentRecord<number> {
    public id: number;
    public name: string;

    public constructor(init?: Partial<LodgingType>) {
        super();
        Object.assign(this, init);
    }
}