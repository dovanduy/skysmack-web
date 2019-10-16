import { Guid } from 'guid-typescript';

export class SiteMinderColumn<T> {
    public id: string;
    public title: string;
    public cells?: T;

    constructor(init?: Partial<SiteMinderColumn<T>>) {
        Object.assign(this, init);
        this.id = Guid.create().toString();
    }
}