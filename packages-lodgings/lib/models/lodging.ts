import { DocumentRecord } from "@skysmack/framework";

export class Lodging implements DocumentRecord<number> {
    public id: number;
    public name: string;
    public lodgingTypeId: number;
    public occupationState: 'vacant' | 'occupied' | 'disabled';
    public static OccupationStateEnum = {
        Vacant: 'vacant',
        Occupied: 'occupied',
        Disabled: 'disabled'
    }

    public constructor(init?: Partial<Lodging>) {
        Object.assign(this, init);
    }

}
