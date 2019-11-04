export class SiteMinderColumn {
    public id?: any;
    public title: string;

    constructor(init?: Partial<SiteMinderColumn>) {
        Object.assign(this, init);
    }
}