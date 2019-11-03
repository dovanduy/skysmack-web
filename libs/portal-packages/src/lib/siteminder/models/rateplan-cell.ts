import { ChannelCell } from './channel-cell';

export class RateplanCell {
    public rateplanId: number;
    
    public channels: ChannelCell[];

    constructor(init?: Partial<RateplanCell>) {
        Object.assign(this, init);
    }
}