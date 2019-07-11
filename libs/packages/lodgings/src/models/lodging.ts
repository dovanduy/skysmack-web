import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { LodgingType } from "./lodging-type";

export class Lodging extends DocumentRecord<number> {
    public id: number;
    public name: string;
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;
    public disabled: boolean;

    public constructor(init?: Partial<Lodging>) {
        super();
        Object.assign(this, init);
    }
}
