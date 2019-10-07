import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { AssignmentType } from "./assignment-type";

export class AssignmentsSchedule extends DocumentRecord<number> {
    public assignmentTypeId: number;
    public assignmentType: LocalObject<AssignmentType, number>;

    public start?: Date;
    public end?: Date;

    public expression: string;


    public constructor(init?: Partial<AssignmentsSchedule>) {
        super();
        Object.assign(this, init);
    }
}