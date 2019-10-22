import { Record } from '@skysmack/framework';
import { AssignmentStatus } from './assignment-status';

export interface ScheduledAssignmentKey {
    scheduleId: number;
    originalTime: Date;
}

export class ScheduledAssignment extends Record<ScheduledAssignmentKey> {
    public scheduleId: number;
    public originalTime: Date;
    public description: string;
    public status: AssignmentStatus;
    public due: Date;
    public from: Date

    public constructor(init?: Partial<ScheduledAssignment>) {
        super(init);
        Object.assign(this, init);
    }
}