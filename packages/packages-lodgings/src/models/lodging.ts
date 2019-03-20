import { DocumentRecord } from "@skysmack/framework";

export class Lodging extends DocumentRecord<number> {
    public id: number;
    public name: string;
    public lodgingTypeId: number;
    public status: 'vacant' | 'occupied' | 'disabled';
    public static StatusEnum = {
        Vacant: 'vacant',
        Occupied: 'occupied',
        Disabled: 'disabled'
    }

    public constructor(init?: Partial<Lodging>) {
        super();
        Object.assign(this, init);
    }
}
