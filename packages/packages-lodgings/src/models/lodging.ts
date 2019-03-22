import { DocumentRecord } from "@skysmack/framework";

export class Lodging extends DocumentRecord<number> {
    public id: number;
    public name: string;
    public lodgingTypeId: number;
    public disabled: boolean;

    public constructor(init?: Partial<Lodging>) {
        super();
        Object.assign(this, init);
    }
}
