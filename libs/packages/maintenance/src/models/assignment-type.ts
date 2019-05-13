import { DocumentRecord, LocalObject } from "@skysmack/framework";
import { MaintenanceState } from './maintenance-state';

export class AssignmentType extends DocumentRecord<number> {
    public id: number;
    public stateId: number;
    public state: LocalObject<MaintenanceState, number>;
    public description: string;
    public expression: number;
    public duePeriod: number;
    [key: string]: any;

    public constructor(init?: Partial<AssignmentType>) {
        super();
        Object.assign(this, init);
    }
}