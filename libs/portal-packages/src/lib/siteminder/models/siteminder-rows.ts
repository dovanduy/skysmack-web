import { SiteminderCell } from './siteminder-cell';
import { LodgingCell } from './lodging-cell';

export class SiteminderRow {
    public date: Date;
    public cells: SiteminderCell<any>[];

    public lodgings: LodgingCell[];

    constructor(init?: Partial<SiteminderRow>) {
        Object.assign(this, init);
    }
}
