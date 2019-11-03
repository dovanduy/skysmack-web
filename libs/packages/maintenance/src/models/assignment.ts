import { AssignmentStatus } from './assignment-status';
import { LocalObject } from '@skysmack/framework';
import { AssignmentType } from './assignment-type';

export class Assignment {
    public id: number;
    public originalTime?: Date;
    public description: string;
    public status: AssignmentStatus;
    public from: Date;
    public due: Date;

    public assignmentTypeId: number;
    public assignmentType: LocalObject<AssignmentType, number>;

    public constructor(init?: Partial<Assignment>) {
        Object.assign(this, init);
    }
}