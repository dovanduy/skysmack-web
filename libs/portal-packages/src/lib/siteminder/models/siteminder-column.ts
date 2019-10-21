import { Guid } from 'guid-typescript';

export class SiteMinderColumn {
    public id: string;
    public title: string;

    constructor(init?: Partial<SiteMinderColumn>) {
        Object.assign(this, init);
        this.id = Guid.create().toString();
    }
}