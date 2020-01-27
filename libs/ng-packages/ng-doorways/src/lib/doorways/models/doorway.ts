import { DocumentRecord } from "@skysmack/framework";

export class Doorway extends DocumentRecord<number> {
    public name: string;
    public description: string;

    public constructor(init?: Partial<Doorway>) {
        super();
        Object.assign(this, init);
    }
}