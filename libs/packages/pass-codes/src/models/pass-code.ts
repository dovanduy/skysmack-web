import { DocumentRecord } from "@skysmack/framework";

export class PassCode extends DocumentRecord<number> {
    public code: string;
    public description: string;

    public constructor(init?: Partial<PassCode>) {
        super();
        Object.assign(this, init);
    }
}