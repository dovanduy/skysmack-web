import { DocumentRecord } from "@skysmack/framework";

export class RecurringAssignment extends DocumentRecord<number> {
    public id: number;
    public description: string;
    public status: number;
    [key: string]: any;

    public constructor(init?: Partial<RecurringAssignment>) {
        super();
        Object.assign(this, init);
    }
}