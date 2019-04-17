import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { AssignmentType } from "./assignment-type";

export class RecurringAssignment extends DocumentRecord<number> {
    public id: number;
    public description: string;
    public status: number;
    [key: string]: any;

    public assignmentTypeId: number;
    public assignmentType: LocalObject<AssignmentType, number>;

    public constructor(init?: Partial<RecurringAssignment>) {
        super();
        Object.assign(this, init);
    }
}