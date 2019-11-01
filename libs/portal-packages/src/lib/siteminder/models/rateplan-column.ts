import { ChannelColumn } from './channel-column';

export class RateplanColumn {
    public id: number;
    public title: string;

    public channels: ChannelColumn[];

    constructor(init?: Partial<RateplanColumn>) {
        Object.assign(this, init);
    }
}