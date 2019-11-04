export class ChannelColumn {
    public id: number;
    public title: string;

    constructor(init?: Partial<ChannelColumn>) {
        Object.assign(this, init);
    }
}