import { DocumentRecord } from "@skysmack/framework";

export class MaintenanceState extends DocumentRecord<number> {
    public id: number;
    public description: string;
    public status: number;
    [key: string]: any;

    public constructor(init?: Partial<MaintenanceState>) {
        super();
        Object.assign(this, init);
    }
}