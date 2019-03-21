import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { AssignmentType } from './assignment-type';

type Status = 'created' | 'pending' | 'ongoing' | 'done' | 'canceled' | 'faulted'

export class Assignment extends DocumentRecord<number> {
    public id: number;
    public description: string;

    // TODO(GET_DEPS): Add "assignmentType" when a relation id exists (e.g. assignmentTypeId).
    public assignmentTypeId: number;
    public assignmentType: LocalObject<AssignmentType, number>;

    public status: Status;
    public static StatusEnum = {
        Created: 'created',
        Pending: 'pending',
        Ongoing: 'ongoing',
        Done: 'done',
        Canceled: 'canceled',
        Faulted: 'faulted'
    }

    public constructor(init?: Partial<Assignment>) {
        super();
        Object.assign(this, init);
    }
}
