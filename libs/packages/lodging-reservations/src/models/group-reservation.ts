import { DocumentRecord } from "@skysmack/framework";

export class GroupReservation extends DocumentRecord<number> {
    public name: string;

    public constructor(init?: Partial<GroupReservation>) {
        super();
        Object.assign(this, init);
    }
}
