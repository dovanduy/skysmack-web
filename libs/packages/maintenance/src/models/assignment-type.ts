import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { MaintenanceState } from './maintenance-state';

export class AssignmentType extends DocumentRecord<number> {
    public description: string;
    public stateId: number;
    public state: LocalObject<MaintenanceState, number>;
    public duePeriod: string;

    public constructor(init?: Partial<AssignmentType>) {
        super();
        Object.assign(this, init);
    }
}