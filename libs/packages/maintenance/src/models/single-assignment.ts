import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { AssignmentType } from './assignment-type';
import { AssignmentStatus } from './assignment-status';


export class SingleAssignment extends DocumentRecord<number> {
    public description: string;

    public assignmentTypeId: number;
    public assignmentType: LocalObject<AssignmentType, number>;

    public status: AssignmentStatus;

    public due: Date;
    public from: Date;

    public constructor(init?: Partial<SingleAssignment>) {
        super();
        Object.assign(this, init);
    }
}
