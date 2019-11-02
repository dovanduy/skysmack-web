import { SiteminderCell } from './siteminder-cell';

export class SiteminderRow {
    public date: Date;
    public cells: SiteminderCell<any>[];

    constructor(init?: Partial<SiteminderRow>) {
        Object.assign(this, init);
    }
}
