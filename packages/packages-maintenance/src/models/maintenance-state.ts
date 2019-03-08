import { DocumentRecord } from "@skysmack/framework";
import { MaintenanceEntityStatus } from './maintenace-entity-status';

export class MaintenanceState extends DocumentRecord<number> {
    public id: number;
    public description: string;
    public status: MaintenanceEntityStatus;

    public constructor(init?: Partial<MaintenanceState>) {
        super();
        Object.assign(this, init);
    }
}