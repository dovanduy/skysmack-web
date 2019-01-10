import { DocumentRecord } from "@skysmack/framework";

export class Terminal extends DocumentRecord<number> {
    public id: number;

    public constructor(init?: Partial<Terminal>) {
        super();
        Object.assign(this, init);
    }
}
