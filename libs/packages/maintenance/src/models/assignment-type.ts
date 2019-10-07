import { DocumentRecord } from "@skysmack/framework";

export class AssignmentType extends DocumentRecord<number> {
    public description: string;
    public stateId: number;
    public duePeriod: string;

    public constructor(init?: Partial<AssignmentType>) {
        super();
        Object.assign(this, init);
    }
}