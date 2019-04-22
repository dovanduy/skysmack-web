import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { LodgingsType } from "../lodgings-type";

export class Lodging extends DocumentRecord<number> {
    public id: number;
    public name: string;
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingsType, number>;
    public disabled: boolean;

    public constructor(init?: Partial<Lodging>) {
        super();
        Object.assign(this, init);
    }
}
