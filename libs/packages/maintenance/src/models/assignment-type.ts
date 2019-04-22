import { DocumentRecord } from "@skysmack/framework";

export class AssignmentType extends DocumentRecord<number> {
    public id: number;
    public stateId: number;
    public description: string;
    public expression: number;
    public duePeriod: number;
    [key: string]: any;

    public constructor(init?: Partial<AssignmentType>) {
        super();
        Object.assign(this, init);
    }
}