import { LodgingCell } from './lodging-cell';

export class SiteminderRow {
    public date: Date;
    public lodgingCells: LodgingCell[];

    constructor(init?: Partial<SiteminderRow>) {
        Object.assign(this, init);
    }
}
